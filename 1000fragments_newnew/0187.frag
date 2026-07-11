uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	float sc = 1.0;
	for(int ki = 0; ki < 4; ki++){
		q = abs(q) - vec3(0.58, 0.73, 0.43);
		q.xy = rot2(1.17 + (time * 0.58) * 0.49) * q.xy;
		q.xz = rot2(0.21) * q.xz;
		q *= 1.39; sc *= 1.39;
	}
	vec3 b = abs(q) - vec3(0.35);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.52);
	vec3 rd = normalize(vec3(p, 1.33));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.85;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.19 + (time * 0.58) * 0.05, vec3(0.29, 0.25, 0.28), vec3(0.18, 0.22, 0.24), vec3(0.55, 0.73, 0.54), vec3(0.56, 0.67, 0.24)) * fog;
	col += vec3(0.33, 0.24, 0.93) * (it / 54.0) * 0.76;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.64));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(1.043, 0.980, 0.916) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

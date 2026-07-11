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
		q = abs(q) - vec3(0.63, 0.61, 0.44);
		q.xy = rot2(1.21 + (time * 0.63) * 0.22) * q.xy;
		q.xz = rot2(0.36) * q.xz;
		q *= 1.50; sc *= 1.50;
	}
	vec3 b = abs(q) - vec3(0.39);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.93);
	vec3 rd = normalize(vec3(p, 0.96));
	rd.xy = rot2((time * 0.63) * 0.16) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.32 + (time * 0.63) * 0.09, vec3(0.31, 0.38, 0.38), vec3(0.18, 0.17, 0.26), vec3(0.64, 0.44, 0.43), vec3(0.57, 0.87, 0.76)) * fog;
	col += vec3(0.23, 0.48, 0.28) * (it / 65.0) * 0.85;
	col *= 0.87 + 0.18 * sin(gl_FragCoord.y * 2.63 + (time * 0.63) * 6.57);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(0.990, 1.016, 0.980) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

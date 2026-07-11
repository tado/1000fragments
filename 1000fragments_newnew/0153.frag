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
		q = abs(q) - vec3(0.74, 0.72, 0.35);
		q.xy = rot2(0.24 + (time * 0.83) * 0.22) * q.xy;
		q.xz = rot2(0.32) * q.xz;
		q *= 1.58; sc *= 1.58;
	}
	vec3 b = abs(q) - vec3(0.30);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.05);
	vec3 rd = normalize(vec3(p, 1.53));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.17 + (time * 0.83) * 0.06, vec3(0.30, 0.22, 0.30), vec3(0.24, 0.28, 0.26), vec3(0.50, 0.60, 0.89), vec3(0.98, 0.89, 0.49)) * fog;
	col += vec3(0.56, 0.41, 0.49) * (it / 62.0) * 0.72;
	col = clamp((col - 0.5) * 1.26 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(0.984, 1.000, 0.948) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

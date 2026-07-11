uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.xz = rot2((time * 0.82) * 0.62) * q.xz;
	q.xy = rot2((time * 0.82) * 1.13) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.02, q.y);
	return length(w) - 0.29;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.87);
	vec3 rd = normalize(vec3(p, 1.00));
	rd.xy = rot2((time * 0.82) * 0.36) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.72;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.38 + (time * 0.82) * 0.02, vec3(0.47, 0.51, 0.53), vec3(0.18, 0.22, 0.25), vec3(0.62, 0.65, 0.77), vec3(0.19, 0.96, 0.41)) * fog;
	col += vec3(0.86, 0.44, 1.00) * (it / 49.0) * 0.92;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(0.929, 0.977, 1.021) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

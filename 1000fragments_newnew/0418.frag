uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.xz = rot2((time * 0.83) * 0.66) * q.xz;
	q.xy = rot2((time * 0.83) * 0.63) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.18, q.y);
	return length(w) - 0.30;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.95);
	vec3 rd = normalize(vec3(p, 1.38));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.10 + (time * 0.83) * 0.25, vec3(0.50, 0.49, 0.44), vec3(0.18, 0.18, 0.21), vec3(0.44, 0.45, 0.72), vec3(0.84, 0.75, 0.39)) * fog;
	col += vec3(0.99, 0.58, 0.29) * (it / 55.0) * 0.55;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(1.001, 0.972, 1.027) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

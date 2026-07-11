uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.xz = rot2((time * 0.57) * 1.31) * q.xz;
	q.xy = rot2((time * 0.57) * 0.52) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.33, q.y);
	return length(w) - 0.16;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.38);
	vec3 rd = normalize(vec3(p, 1.75));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.26 + (time * 0.57) * 0.15, vec3(0.33, 0.29, 0.31), vec3(0.25, 0.17, 0.25), vec3(0.65, 0.50, 0.67), vec3(0.16, 0.34, 0.49)) * fog;
	col += vec3(0.71, 0.78, 0.49) * (it / 55.0) * 0.73;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.52);
	col = clamp(col, 0.0, 1.0) * vec3(0.992, 0.967, 1.014) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

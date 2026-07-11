uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.45) * q.xz;
	q.xy = rot2(time * 1.12) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.82, q.y);
	return length(w) - 0.38;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.53);
	vec3 rd = normalize(vec3(p, 1.02));
	rd.xy = rot2(time * 0.14) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.26 + time * 0.00, vec3(0.42, 0.58, 0.58), vec3(0.47, 0.47, 0.47), vec3(0.79, 1.24, 1.13), vec3(0.04, 0.29, 0.24)) * fog;
	col += vec3(0.96, 0.71, 0.92) * (it / 54.0) * 0.48;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

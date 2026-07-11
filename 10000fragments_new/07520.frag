uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.47) * q.xz;
	q.xy = rot2(time * 0.42) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.93, q.y);
	return length(w) - 0.43;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.93);
	vec3 rd = normalize(vec3(p, 1.59));
	rd.xy = rot2(time * 0.13) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.21 + time * 0.11, vec3(0.53, 0.53, 0.52), vec3(0.44, 0.47, 0.31), vec3(0.82, 1.33, 1.03), vec3(0.14, 0.34, 0.64)) * fog;
	col += vec3(0.59, 0.61, 0.93) * (it / 64.0) * 0.82;
	col = clamp((col - 0.5) * 2.19 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.03;
	vec2 g = mod(vec2(q.x, q.z), 1.86) - 0.93;
	float d = length(g) - (0.20 + 0.07 * sin(q.y * 1.66 + time * 1.49));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.93, 0.93, -3.0);
	vec3 rd = normalize(vec3(p, 1.12));
	rd.xy = rot2(time * 0.24) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.28 + time * 0.24, vec3(0.46, 0.55, 0.45), vec3(0.36, 0.48, 0.31), vec3(0.75, 1.07, 0.98), vec3(0.14, 0.35, 0.09)) * fog;
	col += vec3(0.70, 0.31, 0.40) * (it / 64.0) * 0.80;
	col = clamp((col - 0.5) * 1.38 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

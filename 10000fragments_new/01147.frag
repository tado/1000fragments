uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.40) * q.xz;
	q.xy = rot2(time * 0.32) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.18, q.y);
	return length(w) - 0.31;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.37);
	vec3 rd = normalize(vec3(p, 1.28));
	rd.xy = rot2(time * 0.35) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.28 + time * 0.30, vec3(0.55, 0.57, 0.55), vec3(0.43, 0.44, 0.44), vec3(0.72, 1.39, 1.20), vec3(0.25, 0.45, 0.05)) * fog;
	col += vec3(0.28, 0.71, 0.54) * (it / 53.0) * 0.97;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.04 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

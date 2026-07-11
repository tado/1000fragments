uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.62) * q.xz;
	q.xy = rot2(time * 0.35) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.25, q.y);
	return length(w) - 0.31;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.12);
	vec3 rd = normalize(vec3(p, 1.14));
	rd.xy = rot2(time * -0.14) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.38 + time * 0.03, vec3(0.53, 0.42, 0.51), vec3(0.45, 0.48, 0.48), vec3(0.84, 1.31, 1.21), vec3(0.67, 0.34, 0.28)) * fog;
	col += vec3(0.27, 0.86, 0.50) * (it / 71.0) * 0.59;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.13 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

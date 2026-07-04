uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 1.56) * q.xz;
	q.xy = rot2(time * 0.79) * q.xy;
	vec2 w = vec2(length(q.xz) - 1.03, q.y);
	return length(w) - 0.16;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.29);
	vec3 rd = normalize(vec3(p, 1.39));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.40 + time * 0.27, vec3(0.52, 0.47, 0.58), vec3(0.50, 0.31, 0.38), vec3(1.08, 1.13, 0.99), vec3(0.75, 0.53, 0.05)) * fog;
	col += vec3(0.56, 0.36, 0.25) * (it / 63.0) * 0.71;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.19 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

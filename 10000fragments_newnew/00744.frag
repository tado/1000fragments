uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.42;
	vec2 g = mod(vec2(q.x, q.z), 2.32) - 1.16;
	float d = length(g) - (0.20 + 0.05 * sin(q.y * 3.78 + time * 3.14));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.16, 1.16, -3.0);
	vec3 rd = normalize(vec3(p, 1.70));
	rd.xy = rot2(time * 0.25) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.30 + time * 0.34, vec3(0.47, 0.49, 0.51), vec3(0.33, 0.34, 0.31), vec3(1.39, 1.20, 0.86), vec3(0.91, 0.90, 0.59)) * fog;
	col += vec3(0.85, 0.32, 0.23) * (it / 69.0) * 0.43;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

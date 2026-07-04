uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.55;
	vec2 g = mod(vec2(q.x, q.z), 1.92) - 0.96;
	float d = length(g) - (0.32 + 0.14 * sin(q.y * 1.68 + time * 1.94));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.96, 0.96, -3.0);
	vec3 rd = normalize(vec3(p, 1.49));
	rd.xy = rot2(time * -0.32) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.11 + time * 0.17, vec3(0.51, 0.53, 0.49), vec3(0.42, 0.40, 0.45), vec3(0.90, 1.10, 0.99), vec3(0.73, 0.01, 0.73)) * fog;
	col += vec3(0.36, 0.74, 0.36) * (it / 56.0) * 0.33;
	col = mod(col * 2.87, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

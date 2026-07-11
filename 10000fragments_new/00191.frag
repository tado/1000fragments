uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.14;
	float g = dot(sin(q * 1.85), cos(q.zxy * 1.85));
	return (abs(g) - 0.80) / (1.85 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.43);
	vec3 rd = normalize(vec3(p, 0.97));
	rd.xy = rot2(time * 0.16) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.18 + time * 0.39, vec3(0.47, 0.49, 0.40), vec3(0.31, 0.37, 0.31), vec3(0.97, 0.90, 1.26), vec3(0.99, 0.75, 0.44)) * fog;
	col += vec3(0.72, 0.58, 0.50) * (it / 58.0) * 0.48;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

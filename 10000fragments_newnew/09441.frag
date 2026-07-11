uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.55;
	float g = dot(sin(q * 1.99), cos(q.zxy * 1.99));
	return (abs(g) - 0.47) / (1.99 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.81);
	vec3 rd = normalize(vec3(p, 1.31));
	rd.xy = rot2(time * -0.08) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.20);
	vec3 col = palette(tt * 0.37 + time * 0.03, vec3(0.47, 0.55, 0.56), vec3(0.33, 0.46, 0.40), vec3(0.90, 1.19, 0.82), vec3(0.34, 0.15, 0.14)) * fog;
	col += vec3(0.77, 0.97, 0.55) * (it / 55.0) * 0.35;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

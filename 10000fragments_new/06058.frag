uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.65;
	float g = dot(sin(q * 2.22), cos(q.zxy * 2.22));
	return (abs(g) - 0.75) / (2.22 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.61);
	vec3 rd = normalize(vec3(p, 0.94));
	rd.xy = rot2(time * -0.19) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.34 + time * 0.38, vec3(0.40, 0.47, 0.50), vec3(0.38, 0.45, 0.41), vec3(1.17, 1.15, 1.32), vec3(0.88, 0.72, 0.05)) * fog;
	col += vec3(0.60, 0.82, 0.41) * (it / 68.0) * 0.92;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

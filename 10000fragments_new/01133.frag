uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.91;
	float g = dot(sin(q * 2.25), cos(q.zxy * 2.25));
	return (abs(g) - 0.73) / (2.25 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.48);
	vec3 rd = normalize(vec3(p, 1.38));
	rd.xy = rot2(time * 0.05) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.23 + time * 0.25, vec3(0.58, 0.46, 0.54), vec3(0.33, 0.49, 0.36), vec3(1.27, 1.08, 1.09), vec3(0.17, 0.46, 0.06)) * fog;
	col += vec3(0.64, 0.52, 0.62) * (it / 68.0) * 0.55;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

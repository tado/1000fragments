uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.80;
	float g = dot(sin(q * 2.13), cos(q.zxy * 2.13));
	return (abs(g) - 0.45) / (2.13 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.88);
	vec3 rd = normalize(vec3(p, 1.61));
	rd.xy = rot2(time * -0.09) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.90;
		it += 1.0;
	}
	float fog = exp(-tt * 0.45);
	vec3 col = palette(tt * 0.36 + time * 0.13, vec3(0.57, 0.40, 0.47), vec3(0.39, 0.41, 0.48), vec3(1.31, 1.04, 0.71), vec3(0.79, 0.92, 0.37)) * fog;
	col += vec3(0.73, 0.64, 0.57) * (it / 50.0) * 0.78;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

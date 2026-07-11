uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.69;
	float g = dot(sin(q * 2.01), cos(q.zxy * 2.01));
	return (abs(g) - 0.31) / (2.01 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.47);
	vec3 rd = normalize(vec3(p, 1.71));
	rd.xy = rot2(time * 0.13) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.36 + time * 0.15, vec3(0.56, 0.50, 0.45), vec3(0.45, 0.31, 0.33), vec3(1.30, 1.17, 0.71), vec3(0.13, 0.55, 0.17)) * fog;
	col += vec3(0.22, 0.78, 0.64) * (it / 60.0) * 0.89;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.78;
	float g = dot(sin(q * 2.86), cos(q.zxy * 2.86));
	return (abs(g) - 0.59) / (2.86 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.90);
	vec3 rd = normalize(vec3(p, 1.69));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.86;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.38 + time * 0.15, vec3(0.52, 0.47, 0.44), vec3(0.36, 0.38, 0.42), vec3(1.03, 0.94, 1.19), vec3(0.21, 0.86, 0.17)) * fog;
	col += vec3(0.22, 0.21, 0.48) * (it / 64.0) * 0.38;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

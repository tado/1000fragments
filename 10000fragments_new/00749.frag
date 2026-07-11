uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.22;
	float g = dot(sin(q * 1.84), cos(q.zxy * 1.84));
	return (abs(g) - 0.46) / (1.84 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.31);
	vec3 rd = normalize(vec3(p, 1.67));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.37 + time * 0.33, vec3(0.49, 0.56, 0.43), vec3(0.47, 0.36, 0.37), vec3(0.91, 1.27, 1.05), vec3(0.86, 0.72, 0.22)) * fog;
	col += vec3(0.32, 0.73, 0.47) * (it / 51.0) * 0.78;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

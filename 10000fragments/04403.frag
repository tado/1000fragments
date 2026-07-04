uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.29;
	float g = dot(sin(q * 3.67), cos(q.zxy * 3.67));
	return (abs(g) - 0.47) / (3.67 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.19);
	vec3 rd = normalize(vec3(p, 1.70));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.13 + time * 0.33, vec3(0.59, 0.54, 0.55), vec3(0.44, 0.38, 0.31), vec3(1.19, 1.08, 1.30), vec3(0.91, 0.05, 0.74)) * fog;
	col += vec3(0.46, 0.76, 0.58) * (it / 62.0) * 0.73;
	col *= 0.88 + 0.14 * sin(gl_FragCoord.y * 1.10 + time * 16.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

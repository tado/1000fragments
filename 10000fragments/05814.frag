uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.73;
	float g = dot(sin(q * 2.49), cos(q.zxy * 2.49));
	return (abs(g) - 0.78) / (2.49 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.43);
	vec3 rd = normalize(vec3(p, 1.23));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.85;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.14 + time * 0.09, vec3(0.40, 0.49, 0.52), vec3(0.47, 0.46, 0.40), vec3(0.92, 0.92, 1.29), vec3(0.11, 0.69, 0.55)) * fog;
	col += vec3(0.62, 0.21, 0.47) * (it / 62.0) * 0.70;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

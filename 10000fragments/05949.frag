uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.51;
	float g = dot(sin(q * 3.54), cos(q.zxy * 3.54));
	return (abs(g) - 0.54) / (3.54 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.50);
	vec3 rd = normalize(vec3(p, 0.98));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.29 + time * 0.04, vec3(0.54, 0.55, 0.54), vec3(0.48, 0.44, 0.48), vec3(0.74, 0.88, 0.98), vec3(0.57, 0.78, 0.31)) * fog;
	col += vec3(0.91, 0.24, 0.47) * (it / 69.0) * 0.95;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

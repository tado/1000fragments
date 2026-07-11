uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.92;
	float g = dot(sin(q * 3.60), cos(q.zxy * 3.60));
	return (abs(g) - 0.20) / (3.60 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.63);
	vec3 rd = normalize(vec3(p, 0.99));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.27 + time * 0.26, vec3(0.43, 0.55, 0.47), vec3(0.37, 0.49, 0.41), vec3(0.81, 1.12, 1.00), vec3(0.36, 0.87, 0.73)) * fog;
	col += vec3(0.22, 0.60, 0.91) * (it / 72.0) * 0.55;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

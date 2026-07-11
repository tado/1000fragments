uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.05;
	float g = dot(sin(q * 3.70), cos(q.zxy * 3.70));
	return (abs(g) - 0.73) / (3.70 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.73);
	vec3 rd = normalize(vec3(p, 1.32));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.39 + time * 0.13, vec3(0.48, 0.59, 0.42), vec3(0.41, 0.39, 0.43), vec3(0.72, 1.34, 0.77), vec3(0.69, 0.58, 0.63)) * fog;
	col += vec3(0.75, 0.63, 0.94) * (it / 53.0) * 0.67;
	col = fract(col * 1.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.69;
	float g = dot(sin(q * 1.56), cos(q.zxy * 1.56));
	return (abs(g) - 0.68) / (1.56 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.67);
	vec3 rd = normalize(vec3(p, 1.12));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.30 + time * 0.25, vec3(0.44, 0.55, 0.53), vec3(0.43, 0.47, 0.50), vec3(0.75, 1.35, 1.05), vec3(0.89, 0.00, 0.81)) * fog;
	col += vec3(0.99, 0.26, 0.58) * (it / 49.0) * 0.72;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

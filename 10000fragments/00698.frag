uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.31;
	float g = dot(sin(q * 1.81), cos(q.zxy * 1.81));
	return (abs(g) - 0.38) / (1.81 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.70);
	vec3 rd = normalize(vec3(p, 1.63));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.11 + time * 0.28, vec3(0.58, 0.53, 0.46), vec3(0.39, 0.40, 0.34), vec3(1.18, 1.14, 1.10), vec3(0.47, 0.10, 0.56)) * fog;
	col += vec3(0.26, 0.78, 0.97) * (it / 49.0) * 0.84;
	col *= 0.89 + 0.19 * sin(gl_FragCoord.y * 1.83 + time * 13.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

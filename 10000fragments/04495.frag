uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.17;
	vec2 g = mod(vec2(q.x, q.z), 2.20) - 1.10;
	float d = length(g) - (0.23 + 0.08 * sin(q.y * 2.76 + time * 1.73));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.10, 1.10, -3.0);
	vec3 rd = normalize(vec3(p, 1.02));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.72;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.38 + time * 0.06, vec3(0.57, 0.44, 0.56), vec3(0.42, 0.37, 0.31), vec3(1.21, 0.88, 1.05), vec3(0.31, 0.34, 0.41)) * fog;
	col += vec3(0.38, 0.78, 0.76) * (it / 69.0) * 0.77;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

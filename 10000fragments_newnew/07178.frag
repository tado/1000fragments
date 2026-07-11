uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.97;
	vec2 g = mod(vec2(q.x, q.z), 1.81) - 0.91;
	float d = length(g) - (0.29 + 0.07 * sin(q.y * 3.99 + time * 3.38));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.91, 0.91, -3.0);
	vec3 rd = normalize(vec3(p, 1.10));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.10 + time * 0.13, vec3(0.43, 0.48, 0.53), vec3(0.32, 0.45, 0.31), vec3(0.73, 1.05, 1.18), vec3(0.10, 0.73, 0.25)) * fog;
	col += vec3(0.83, 0.29, 0.23) * (it / 55.0) * 0.58;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

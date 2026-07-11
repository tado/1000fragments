uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.82;
	vec2 g = mod(vec2(q.x, q.z), 2.15) - 1.07;
	float d = length(g) - (0.18 + 0.10 * sin(q.y * 1.95 + time * 3.99));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.07, 1.07, -3.0);
	vec3 rd = normalize(vec3(p, 1.43));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.32 + time * 0.08, vec3(0.56, 0.40, 0.49), vec3(0.48, 0.42, 0.36), vec3(0.79, 0.99, 1.00), vec3(0.24, 0.65, 0.50)) * fog;
	col += vec3(0.37, 0.84, 0.79) * (it / 55.0) * 0.55;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

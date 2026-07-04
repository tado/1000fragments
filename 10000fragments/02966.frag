uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.22;
	vec2 g = mod(vec2(q.x, q.z), 1.94) - 0.97;
	float d = length(g) - (0.30 + 0.10 * sin(q.y * 2.29 + time * 3.68));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.97, 0.97, -3.0);
	vec3 rd = normalize(vec3(p, 1.22));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.12 + time * 0.29, vec3(0.60, 0.59, 0.54), vec3(0.49, 0.38, 0.32), vec3(0.93, 1.39, 0.87), vec3(0.93, 0.35, 0.72)) * fog;
	col += vec3(0.71, 0.57, 1.00) * (it / 50.0) * 0.43;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.18;
	vec2 g = mod(vec2(q.x, q.z), 1.85) - 0.92;
	float d = length(g) - (0.28 + 0.08 * sin(q.y * 2.40 + time * 1.49));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.92, 0.92, -3.0);
	vec3 rd = normalize(vec3(p, 1.43));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = palette(tt * 0.18 + time * 0.39, vec3(0.60, 0.56, 0.41), vec3(0.36, 0.47, 0.49), vec3(1.09, 0.87, 1.26), vec3(0.46, 0.84, 0.87)) * fog;
	col += vec3(0.64, 0.20, 0.46) * (it / 69.0) * 0.97;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

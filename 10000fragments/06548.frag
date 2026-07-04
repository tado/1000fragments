uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.00;
	vec2 g = mod(vec2(q.x, q.z), 2.54) - 1.27;
	float d = length(g) - (0.28 + 0.07 * sin(q.y * 3.25 + time * 2.52));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.27, 1.27, -3.0);
	vec3 rd = normalize(vec3(p, 1.29));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = palette(tt * 0.29 + time * 0.21, vec3(0.48, 0.51, 0.49), vec3(0.30, 0.31, 0.44), vec3(0.93, 1.24, 0.90), vec3(0.17, 0.20, 0.19)) * fog;
	col += vec3(0.95, 0.40, 0.32) * (it / 52.0) * 0.30;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

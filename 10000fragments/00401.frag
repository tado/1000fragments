uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.92;
	vec2 g = mod(vec2(q.x, q.z), 2.01) - 1.00;
	float d = length(g) - (0.29 + 0.08 * sin(q.y * 1.73 + time * 2.46));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.00, 1.00, -3.0);
	vec3 rd = normalize(vec3(p, 1.13));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.29 + time * 0.31, vec3(0.45, 0.59, 0.42), vec3(0.32, 0.46, 0.37), vec3(1.28, 0.96, 0.72), vec3(0.20, 0.16, 0.95)) * fog;
	col += vec3(0.28, 0.34, 0.46) * (it / 72.0) * 0.69;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.66;
	vec2 g = mod(vec2(q.x, q.z), 2.33) - 1.16;
	float d = length(g) - (0.17 + 0.10 * sin(q.y * 3.62 + time * 1.95));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.16, 1.16, -3.0);
	vec3 rd = normalize(vec3(p, 1.07));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.45);
	vec3 col = palette(tt * 0.36 + time * 0.39, vec3(0.46, 0.40, 0.55), vec3(0.34, 0.37, 0.34), vec3(1.07, 1.16, 1.38), vec3(0.29, 0.23, 0.02)) * fog;
	col += vec3(0.50, 1.00, 0.37) * (it / 63.0) * 0.84;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

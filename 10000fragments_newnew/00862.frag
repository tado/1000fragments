uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.96;
	vec2 g = mod(vec2(q.x, q.z), 2.32) - 1.16;
	float d = length(g) - (0.30 + 0.11 * sin(q.y * 3.55 + time * 1.77));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.16, 1.16, -3.0);
	vec3 rd = normalize(vec3(p, 1.13));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.60;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.40 + time * 0.18, vec3(0.46, 0.52, 0.51), vec3(0.41, 0.49, 0.50), vec3(0.94, 0.74, 1.25), vec3(0.93, 0.72, 0.22)) * fog;
	col += vec3(0.71, 0.39, 0.28) * (it / 58.0) * 0.43;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.60;
	vec2 g = mod(vec2(q.x, q.z), 2.08) - 1.04;
	float d = length(g) - (0.31 + 0.05 * sin(q.y * 2.75 + time * 1.98));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.04, 1.04, -3.0);
	vec3 rd = normalize(vec3(p, 0.99));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.32);
	vec3 col = palette(tt * 0.32 + time * 0.39, vec3(0.57, 0.52, 0.52), vec3(0.41, 0.43, 0.38), vec3(1.16, 1.04, 0.83), vec3(0.42, 0.31, 0.24)) * fog;
	col += vec3(0.31, 0.86, 0.57) * (it / 64.0) * 0.94;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

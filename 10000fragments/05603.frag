uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.91;
	vec2 g = mod(vec2(q.x, q.z), 2.00) - 1.00;
	float d = length(g) - (0.21 + 0.12 * sin(q.y * 2.18 + time * 2.42));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.00, 1.00, -3.0);
	vec3 rd = normalize(vec3(p, 1.15));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.27 + time * 0.31, vec3(0.55, 0.52, 0.55), vec3(0.45, 0.30, 0.48), vec3(1.23, 0.71, 1.34), vec3(0.75, 0.25, 0.73)) * fog;
	col += vec3(0.42, 0.74, 0.62) * (it / 66.0) * 0.60;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

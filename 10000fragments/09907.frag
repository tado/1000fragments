uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.70;
	vec2 g = mod(vec2(q.x, q.z), 2.26) - 1.13;
	float d = length(g) - (0.27 + 0.06 * sin(q.y * 1.37 + time * 3.65));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.13, 1.13, -3.0);
	vec3 rd = normalize(vec3(p, 1.78));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.20);
	vec3 col = palette(tt * 0.23 + time * 0.09, vec3(0.44, 0.43, 0.44), vec3(0.42, 0.44, 0.42), vec3(1.32, 1.36, 0.73), vec3(0.87, 0.58, 0.97)) * fog;
	col += vec3(0.20, 0.90, 0.73) * (it / 52.0) * 0.92;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

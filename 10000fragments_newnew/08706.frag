uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.64;
	vec2 g = mod(vec2(q.x, q.z), 2.42) - 1.21;
	float d = length(g) - (0.21 + 0.12 * sin(q.y * 1.20 + time * 2.04));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.21, 1.21, -3.0);
	vec3 rd = normalize(vec3(p, 1.26));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.30 + time * 0.36, vec3(0.48, 0.50, 0.47), vec3(0.46, 0.36, 0.47), vec3(0.92, 1.09, 1.00), vec3(0.69, 0.79, 0.60)) * fog;
	col += vec3(0.72, 0.87, 0.32) * (it / 64.0) * 0.51;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

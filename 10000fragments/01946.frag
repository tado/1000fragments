uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.56;
	vec2 g = mod(vec2(q.x, q.z), 2.07) - 1.03;
	float d = length(g) - (0.23 + 0.06 * sin(q.y * 2.99 + time * 2.79));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.03, 1.03, -3.0);
	vec3 rd = normalize(vec3(p, 1.49));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = palette(tt * 0.17 + time * 0.03, vec3(0.49, 0.44, 0.60), vec3(0.37, 0.36, 0.45), vec3(1.28, 1.20, 1.30), vec3(0.60, 0.68, 0.47)) * fog;
	col += vec3(0.45, 0.22, 0.97) * (it / 56.0) * 0.65;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

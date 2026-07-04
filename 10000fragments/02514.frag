uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.79;
	vec2 g = mod(vec2(q.x, q.z), 1.85) - 0.92;
	float d = length(g) - (0.19 + 0.08 * sin(q.y * 3.42 + time * 2.98));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.92, 0.92, -3.0);
	vec3 rd = normalize(vec3(p, 1.07));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = hue(tt * 0.17 + time * 0.02) * fog;
	col += vec3(0.47, 0.23, 0.65) * (it / 71.0) * 0.70;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

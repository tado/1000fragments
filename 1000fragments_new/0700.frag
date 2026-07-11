uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 0.64;
	vec2 g = mod(vec2(q.x, q.z), 2.34) - 1.17;
	float d = length(g) - (0.20 + 0.08 * sin(q.y * 2.84 + time * 2.40));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.17, 1.17, -3.0);
	vec3 rd = normalize(vec3(p, 1.64));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = hue(tt * 0.20 + time * 0.07) * fog;
	col += vec3(0.52, 0.47, 0.31) * (it / 57.0) * 0.80;
	col = mod(col * 2.50, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

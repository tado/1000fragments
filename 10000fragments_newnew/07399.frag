uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.49;
	vec2 g = mod(vec2(q.x, q.z), 2.51) - 1.25;
	float d = length(g) - (0.20 + 0.11 * sin(q.y * 3.81 + time * 2.76));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.25, 1.25, -3.0);
	vec3 rd = normalize(vec3(p, 1.58));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.32);
	vec3 col = hue(tt * 0.12 + time * 0.09) * fog;
	col += vec3(0.88, 0.36, 0.77) * (it / 53.0) * 0.43;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

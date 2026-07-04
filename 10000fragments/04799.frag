uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.76;
	vec2 g = mod(vec2(q.x, q.z), 2.37) - 1.19;
	float d = length(g) - (0.22 + 0.06 * sin(q.y * 1.26 + time * 3.97));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.19, 1.19, -3.0);
	vec3 rd = normalize(vec3(p, 1.77));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = hue(tt * 0.16 + time * 0.08) * fog;
	col += vec3(0.26, 0.36, 0.29) * (it / 57.0) * 0.80;
	col = fract(col * 2.27);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

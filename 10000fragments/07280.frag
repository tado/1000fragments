uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 0.61;
	vec2 g = mod(vec2(q.x, q.z), 2.26) - 1.13;
	float d = length(g) - (0.28 + 0.10 * sin(q.y * 3.12 + time * 1.59));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.13, 1.13, -3.0);
	vec3 rd = normalize(vec3(p, 1.71));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = hue(tt * 0.29 + time * 0.05) * fog;
	col += vec3(0.21, 0.39, 0.39) * (it / 70.0) * 0.56;
	col = mod(col * 2.65, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

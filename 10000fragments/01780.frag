uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.33;
	vec2 g = mod(vec2(q.x, q.z), 2.06) - 1.03;
	float d = length(g) - (0.26 + 0.12 * sin(q.y * 3.33 + time * 2.15));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.03, 1.03, -3.0);
	vec3 rd = normalize(vec3(p, 1.70));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = hue(tt * 0.22 + time * 0.04) * fog;
	col += vec3(0.29, 0.78, 0.30) * (it / 50.0) * 0.32;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

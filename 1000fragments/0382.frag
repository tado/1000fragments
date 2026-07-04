uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.68;
	vec2 g = mod(vec2(q.x, q.z), 1.85) - 0.93;
	float d = length(g) - (0.16 + 0.12 * sin(q.y * 3.37 + time * 1.86));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.93, 0.93, -3.0);
	vec3 rd = normalize(vec3(p, 1.07));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.33 + time * 0.08, vec3(0.56, 0.50, 0.54), vec3(0.48, 0.46, 0.48), vec3(0.89, 1.19, 1.09), vec3(0.51, 0.01, 0.07)) * fog;
	col += vec3(0.93, 0.93, 0.49) * (it / 49.0) * 0.87;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

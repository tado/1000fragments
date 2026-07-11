uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.98;
	vec3 mq = mod(q, 1.76) - 0.88;
	return length(mq) - 0.31;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.88, 0.88, -3.0);
	vec3 rd = normalize(vec3(p, 1.46));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.86;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.19 + time * 0.12, vec3(0.47, 0.54, 0.43), vec3(0.34, 0.44, 0.30), vec3(1.28, 1.05, 0.81), vec3(0.75, 0.73, 0.32)) * fog;
	col += vec3(0.80, 0.80, 0.65) * (it / 57.0) * 0.67;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

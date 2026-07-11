uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.62;
	vec3 mq = mod(q, 1.82) - 0.91;
	return length(mq) - 0.30;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.91, 0.91, -3.0);
	vec3 rd = normalize(vec3(p, 1.49));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.72;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.24 + time * 0.28, vec3(0.57, 0.47, 0.54), vec3(0.47, 0.39, 0.32), vec3(1.39, 1.02, 0.97), vec3(0.59, 0.07, 0.29)) * fog;
	col += vec3(0.61, 0.24, 0.41) * (it / 53.0) * 0.44;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

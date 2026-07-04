uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.86;
	vec3 mq = mod(q, 1.75) - 0.88;
	return length(mq) - 0.39;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.88, 0.88, -3.0);
	vec3 rd = normalize(vec3(p, 1.00));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.88;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.29 + time * 0.17, vec3(0.55, 0.57, 0.42), vec3(0.32, 0.47, 0.32), vec3(1.04, 0.84, 1.12), vec3(0.09, 0.45, 0.96)) * fog;
	col += vec3(0.28, 0.78, 0.75) * (it / 68.0) * 0.73;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.22;
	vec3 mq = mod(q, 2.06) - 1.03;
	return length(mq) - 0.46;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.03, 1.03, -3.0);
	vec3 rd = normalize(vec3(p, 1.61));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.19 + time * 0.38, vec3(0.41, 0.44, 0.59), vec3(0.43, 0.36, 0.32), vec3(1.11, 1.24, 1.06), vec3(0.69, 0.18, 0.05)) * fog;
	col += vec3(0.61, 0.49, 0.82) * (it / 54.0) * 0.62;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.76;
	vec3 mq = mod(q, 2.57) - 1.28;
	return length(mq) - 0.42;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.28, 1.28, -3.0);
	vec3 rd = normalize(vec3(p, 1.46));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.20);
	vec3 col = palette(tt * 0.23 + time * 0.09, vec3(0.52, 0.53, 0.41), vec3(0.30, 0.49, 0.49), vec3(0.76, 0.88, 0.81), vec3(0.21, 0.52, 0.39)) * fog;
	col += vec3(0.96, 0.77, 0.86) * (it / 63.0) * 0.93;
	col *= 0.83 + 0.10 * sin(gl_FragCoord.y * 2.28 + time * 9.69);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

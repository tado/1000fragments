uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.08;
	vec3 mq = mod(q, 2.27) - 1.13;
	return length(mq) - 0.42;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.13, 1.13, -3.0);
	vec3 rd = normalize(vec3(p, 1.63));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.15);
	vec3 col = palette(tt * 0.33 + time * 0.18, vec3(0.44, 0.53, 0.48), vec3(0.36, 0.47, 0.38), vec3(1.14, 1.21, 1.21), vec3(0.78, 0.98, 0.71)) * fog;
	col += vec3(0.82, 0.98, 0.42) * (it / 60.0) * 0.51;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

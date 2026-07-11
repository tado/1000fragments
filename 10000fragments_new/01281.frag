uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.31;
	vec3 mq = mod(q, 1.64) - 0.82;
	return length(mq) - 0.42;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.82, 0.82, -3.0);
	vec3 rd = normalize(vec3(p, 1.20));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.43);
	vec3 col = palette(tt * 0.36 + time * 0.01, vec3(0.46, 0.56, 0.42), vec3(0.42, 0.37, 0.49), vec3(0.94, 1.37, 0.84), vec3(0.48, 0.19, 0.06)) * fog;
	col += vec3(0.24, 0.99, 0.31) * (it / 72.0) * 0.43;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

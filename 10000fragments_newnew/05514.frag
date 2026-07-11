uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.14;
	vec3 mq = mod(q, 2.10) - 1.05;
	return length(mq) - 0.42;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.05, 1.05, -3.0);
	vec3 rd = normalize(vec3(p, 1.13));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.37 + time * 0.30, vec3(0.57, 0.47, 0.51), vec3(0.43, 0.33, 0.33), vec3(1.25, 1.23, 0.73), vec3(0.75, 0.56, 0.26)) * fog;
	col += vec3(0.42, 0.72, 0.72) * (it / 58.0) * 0.35;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

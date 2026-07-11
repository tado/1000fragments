uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.28;
	vec3 mq = mod(q, 1.77) - 0.89;
	return length(mq) - 0.41;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.89, 0.89, -3.0);
	vec3 rd = normalize(vec3(p, 1.58));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.19 + time * 0.21, vec3(0.42, 0.51, 0.52), vec3(0.48, 0.34, 0.38), vec3(0.90, 0.74, 0.89), vec3(0.13, 0.28, 0.42)) * fog;
	col += vec3(0.43, 0.32, 0.86) * (it / 56.0) * 0.78;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

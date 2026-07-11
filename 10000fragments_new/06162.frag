uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.92;
	vec3 mq = mod(q, 1.72) - 0.86;
	return length(mq) - 0.43;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.86, 0.86, -3.0);
	vec3 rd = normalize(vec3(p, 1.17));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.16 + time * 0.03, vec3(0.47, 0.59, 0.48), vec3(0.40, 0.36, 0.40), vec3(1.16, 0.79, 1.36), vec3(0.58, 0.90, 0.68)) * fog;
	col += vec3(0.50, 0.59, 0.38) * (it / 56.0) * 0.31;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

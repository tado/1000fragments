uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.98;
	vec3 mq = mod(q, 2.26) - 1.13;
	return length(mq) - 0.43;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.13, 1.13, -3.0);
	vec3 rd = normalize(vec3(p, 1.10));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.28 + time * 0.20, vec3(0.51, 0.43, 0.45), vec3(0.41, 0.36, 0.37), vec3(1.05, 1.07, 1.24), vec3(0.54, 0.48, 0.40)) * fog;
	col += vec3(0.91, 0.20, 0.41) * (it / 59.0) * 0.46;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

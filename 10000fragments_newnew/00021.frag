uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.28;
	vec3 mq = mod(q, 1.78) - 0.89;
	return length(mq) - 0.28;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.89, 0.89, -3.0);
	vec3 rd = normalize(vec3(p, 1.72));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.16);
	vec3 col = palette(tt * 0.12 + time * 0.09, vec3(0.41, 0.43, 0.44), vec3(0.40, 0.40, 0.35), vec3(0.86, 0.88, 1.34), vec3(0.65, 0.56, 0.14)) * fog;
	col += vec3(0.64, 0.26, 0.47) * (it / 60.0) * 0.53;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

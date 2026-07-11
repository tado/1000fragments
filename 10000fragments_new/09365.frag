uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.95;
	vec3 mq = mod(q, 2.33) - 1.17;
	return length(mq) - 0.37;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.17, 1.17, -3.0);
	vec3 rd = normalize(vec3(p, 1.67));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.36 + time * 0.04, vec3(0.48, 0.45, 0.49), vec3(0.44, 0.37, 0.50), vec3(1.27, 1.17, 1.40), vec3(0.42, 0.74, 0.57)) * fog;
	col += vec3(0.63, 0.45, 0.82) * (it / 66.0) * 0.77;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

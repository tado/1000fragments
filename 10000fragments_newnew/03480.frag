uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.92;
	vec3 mq = mod(q, 1.88) - 0.94;
	return length(mq) - 0.43;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.94, 0.94, -3.0);
	vec3 rd = normalize(vec3(p, 1.51));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.16 + time * 0.38, vec3(0.49, 0.44, 0.55), vec3(0.33, 0.40, 0.35), vec3(1.19, 0.71, 0.98), vec3(0.29, 0.74, 0.64)) * fog;
	col += vec3(0.26, 0.97, 0.73) * (it / 53.0) * 0.89;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

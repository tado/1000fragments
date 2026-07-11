uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.51;
	vec3 mq = mod(q, 2.43) - 1.22;
	return length(mq) - 0.35;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.22, 1.22, -3.0);
	vec3 rd = normalize(vec3(p, 0.91));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.89;
		it += 1.0;
	}
	float fog = exp(-tt * 0.22);
	vec3 col = palette(tt * 0.13 + time * 0.24, vec3(0.43, 0.56, 0.53), vec3(0.47, 0.38, 0.35), vec3(1.25, 0.98, 1.16), vec3(0.86, 0.75, 0.56)) * fog;
	col += vec3(0.36, 0.76, 0.24) * (it / 68.0) * 0.48;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

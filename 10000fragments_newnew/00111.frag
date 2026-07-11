uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.33;
	vec3 mq = mod(q, 1.60) - 0.80;
	return length(mq) - 0.41;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.80, 0.80, -3.0);
	vec3 rd = normalize(vec3(p, 1.26));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.85;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.29 + time * 0.35, vec3(0.42, 0.43, 0.55), vec3(0.47, 0.36, 0.49), vec3(1.08, 1.02, 1.02), vec3(0.09, 0.61, 0.34)) * fog;
	col += vec3(0.40, 0.22, 0.36) * (it / 59.0) * 0.56;
	col *= 0.81 + 0.20 * sin(gl_FragCoord.y * 0.94 + time * 15.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

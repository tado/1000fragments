uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.93;
	vec3 mq = mod(q, 2.36) - 1.18;
	return length(mq) - 0.26;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.18, 1.18, -3.0);
	vec3 rd = normalize(vec3(p, 1.12));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.38 + time * 0.05, vec3(0.54, 0.47, 0.41), vec3(0.40, 0.42, 0.47), vec3(0.79, 1.21, 1.08), vec3(0.58, 0.61, 0.28)) * fog;
	col += vec3(0.30, 1.00, 0.80) * (it / 57.0) * 0.81;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

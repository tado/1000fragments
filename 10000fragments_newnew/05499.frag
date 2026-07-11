uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.98;
	vec3 mq = mod(q, 2.42) - 1.21;
	return length(mq) - 0.41;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.21, 1.21, -3.0);
	vec3 rd = normalize(vec3(p, 1.77));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.24 + time * 0.27, vec3(0.44, 0.59, 0.55), vec3(0.49, 0.30, 0.43), vec3(1.37, 0.82, 0.73), vec3(0.13, 0.08, 0.70)) * fog;
	col += vec3(0.82, 0.99, 0.98) * (it / 54.0) * 0.51;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

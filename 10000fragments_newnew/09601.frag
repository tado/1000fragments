uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.36;
	vec3 mq = mod(q, 1.84) - 0.92;
	return length(mq) - 0.40;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.92, 0.92, -3.0);
	vec3 rd = normalize(vec3(p, 1.49));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.38 + time * 0.13, vec3(0.60, 0.43, 0.56), vec3(0.34, 0.45, 0.47), vec3(0.86, 1.28, 0.70), vec3(0.73, 0.08, 0.48)) * fog;
	col += vec3(0.42, 0.29, 0.33) * (it / 60.0) * 0.36;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

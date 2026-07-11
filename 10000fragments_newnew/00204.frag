uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.09;
	vec3 mq = mod(q, 2.55) - 1.27;
	return length(mq) - 0.43;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.27, 1.27, -3.0);
	vec3 rd = normalize(vec3(p, 1.69));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.45);
	vec3 col = palette(tt * 0.29 + time * 0.08, vec3(0.46, 0.59, 0.44), vec3(0.46, 0.45, 0.41), vec3(0.89, 0.83, 1.04), vec3(0.73, 0.14, 0.88)) * fog;
	col += vec3(0.83, 0.78, 0.31) * (it / 57.0) * 0.74;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

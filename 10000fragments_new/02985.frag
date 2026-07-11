uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.49;
	vec3 mq = mod(q, 2.29) - 1.14;
	return length(mq) - 0.43;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.14, 1.14, -3.0);
	vec3 rd = normalize(vec3(p, 1.24));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.18 + time * 0.07, vec3(0.54, 0.41, 0.54), vec3(0.48, 0.42, 0.34), vec3(0.75, 0.91, 0.94), vec3(0.07, 0.47, 0.44)) * fog;
	col += vec3(0.52, 0.93, 0.64) * (it / 51.0) * 0.99;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

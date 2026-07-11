uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.14;
	vec3 mq = mod(q, 2.53) - 1.26;
	return length(mq) - 0.41;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.26, 1.26, -3.0);
	vec3 rd = normalize(vec3(p, 1.23));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.14 + time * 0.32, vec3(0.53, 0.51, 0.41), vec3(0.48, 0.47, 0.39), vec3(1.07, 1.10, 1.16), vec3(0.98, 0.21, 0.21)) * fog;
	col += vec3(0.59, 0.44, 0.84) * (it / 50.0) * 0.58;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

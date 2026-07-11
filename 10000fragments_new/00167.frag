uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.47;
	vec3 mq = mod(q, 2.38) - 1.19;
	return length(mq) - 0.26;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.19, 1.19, -3.0);
	vec3 rd = normalize(vec3(p, 1.73));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.40 + time * 0.27, vec3(0.41, 0.57, 0.50), vec3(0.49, 0.32, 0.39), vec3(1.06, 1.07, 0.99), vec3(0.41, 0.35, 0.79)) * fog;
	col += vec3(0.64, 0.26, 0.98) * (it / 68.0) * 0.76;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

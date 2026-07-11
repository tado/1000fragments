uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.03;
	vec3 mq = mod(q, 2.37) - 1.18;
	return length(mq) - 0.38;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.18, 1.18, -3.0);
	vec3 rd = normalize(vec3(p, 1.72));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.90;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.20 + time * 0.33, vec3(0.55, 0.53, 0.43), vec3(0.45, 0.47, 0.43), vec3(0.91, 1.07, 0.77), vec3(0.13, 0.83, 0.53)) * fog;
	col += vec3(0.32, 0.79, 0.59) * (it / 57.0) * 0.88;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

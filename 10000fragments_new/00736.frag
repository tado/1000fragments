uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.84;
	vec3 mq = mod(q, 2.32) - 1.16;
	return length(mq) - 0.27;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.16, 1.16, -3.0);
	vec3 rd = normalize(vec3(p, 1.75));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.39 + time * 0.07, vec3(0.50, 0.43, 0.46), vec3(0.38, 0.32, 0.37), vec3(0.96, 1.35, 0.85), vec3(0.15, 0.06, 0.85)) * fog;
	col += vec3(0.94, 0.26, 0.49) * (it / 57.0) * 0.93;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

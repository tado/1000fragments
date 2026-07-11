uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.38;
	vec3 mq = mod(q, 2.06) - 1.03;
	return length(mq) - 0.46;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.03, 1.03, -3.0);
	vec3 rd = normalize(vec3(p, 1.32));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = palette(tt * 0.17 + time * 0.12, vec3(0.53, 0.58, 0.40), vec3(0.47, 0.37, 0.33), vec3(0.96, 1.03, 0.93), vec3(0.44, 0.48, 0.51)) * fog;
	col += vec3(0.92, 0.75, 0.32) * (it / 59.0) * 0.67;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

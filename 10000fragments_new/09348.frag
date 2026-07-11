uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.97;
	vec3 mq = mod(q, 1.95) - 0.97;
	return length(mq) - 0.38;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.97, 0.97, -3.0);
	vec3 rd = normalize(vec3(p, 1.40));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.85;
		it += 1.0;
	}
	float fog = exp(-tt * 0.15);
	vec3 col = palette(tt * 0.25 + time * 0.15, vec3(0.57, 0.58, 0.43), vec3(0.42, 0.31, 0.49), vec3(0.75, 1.09, 1.05), vec3(0.86, 0.74, 0.47)) * fog;
	col += vec3(0.80, 0.40, 0.69) * (it / 66.0) * 0.56;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

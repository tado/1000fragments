uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.45;
	vec3 mq = mod(q, 2.17) - 1.08;
	return length(mq) - 0.41;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.08, 1.08, -3.0);
	vec3 rd = normalize(vec3(p, 1.29));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.34 + time * 0.11, vec3(0.55, 0.60, 0.43), vec3(0.31, 0.38, 0.41), vec3(0.84, 0.94, 0.93), vec3(0.19, 0.28, 0.87)) * fog;
	col += vec3(0.82, 0.60, 0.75) * (it / 61.0) * 0.47;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

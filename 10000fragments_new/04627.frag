uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.91;
	vec3 mq = mod(q, 2.43) - 1.21;
	return length(mq) - 0.42;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.21, 1.21, -3.0);
	vec3 rd = normalize(vec3(p, 1.57));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.29 + time * 0.28, vec3(0.49, 0.41, 0.52), vec3(0.50, 0.40, 0.49), vec3(0.73, 1.04, 0.82), vec3(0.41, 0.64, 0.73)) * fog;
	col += vec3(0.90, 0.88, 0.89) * (it / 66.0) * 0.51;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

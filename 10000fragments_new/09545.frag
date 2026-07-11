uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.17;
	vec3 mq = mod(q, 2.31) - 1.15;
	return length(mq) - 0.42;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.15, 1.15, -3.0);
	vec3 rd = normalize(vec3(p, 0.93));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.28 + time * 0.23, vec3(0.52, 0.54, 0.44), vec3(0.45, 0.50, 0.49), vec3(1.28, 1.04, 1.32), vec3(0.62, 0.22, 0.95)) * fog;
	col += vec3(0.87, 0.62, 0.50) * (it / 49.0) * 0.86;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

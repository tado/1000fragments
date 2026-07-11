uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.37;
	vec3 mq = mod(q, 2.16) - 1.08;
	return length(mq) - 0.37;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.08, 1.08, -3.0);
	vec3 rd = normalize(vec3(p, 0.93));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.11 + time * 0.23, vec3(0.60, 0.55, 0.47), vec3(0.39, 0.32, 0.44), vec3(1.08, 1.39, 1.26), vec3(0.31, 0.20, 0.80)) * fog;
	col += vec3(0.99, 0.43, 0.71) * (it / 54.0) * 0.54;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

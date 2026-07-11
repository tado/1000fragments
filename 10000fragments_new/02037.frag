uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.06;
	vec3 mq = mod(q, 2.33) - 1.17;
	return length(mq) - 0.32;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.17, 1.17, -3.0);
	vec3 rd = normalize(vec3(p, 1.31));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.13 + time * 0.01, vec3(0.40, 0.49, 0.45), vec3(0.35, 0.31, 0.44), vec3(1.13, 1.40, 1.01), vec3(0.42, 0.73, 0.83)) * fog;
	col += vec3(0.22, 0.71, 0.46) * (it / 72.0) * 0.38;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

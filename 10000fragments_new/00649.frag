uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.73;
	vec3 mq = mod(q, 2.50) - 1.25;
	return length(mq) - 0.40;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.25, 1.25, -3.0);
	vec3 rd = normalize(vec3(p, 1.64));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.12 + time * 0.05, vec3(0.55, 0.46, 0.48), vec3(0.34, 0.36, 0.49), vec3(0.75, 1.37, 1.08), vec3(0.06, 0.80, 0.04)) * fog;
	col += vec3(0.61, 0.52, 0.83) * (it / 48.0) * 0.47;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

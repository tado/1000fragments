uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.23;
	vec3 mq = mod(q, 2.50) - 1.25;
	return length(mq) - 0.44;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.25, 1.25, -3.0);
	vec3 rd = normalize(vec3(p, 0.96));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.24 + time * 0.17, vec3(0.50, 0.55, 0.49), vec3(0.43, 0.36, 0.34), vec3(1.38, 1.08, 0.75), vec3(0.82, 0.04, 0.12)) * fog;
	col += vec3(0.39, 0.32, 0.66) * (it / 58.0) * 0.84;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

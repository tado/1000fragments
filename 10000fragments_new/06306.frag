uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.55;
	vec3 mq = mod(q, 1.61) - 0.80;
	return length(mq) - 0.35;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.80, 0.80, -3.0);
	vec3 rd = normalize(vec3(p, 1.14));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.88;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.38 + time * 0.12, vec3(0.55, 0.55, 0.49), vec3(0.36, 0.34, 0.34), vec3(1.16, 0.72, 1.19), vec3(0.58, 0.75, 0.35)) * fog;
	col += vec3(0.98, 0.75, 0.59) * (it / 67.0) * 0.57;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

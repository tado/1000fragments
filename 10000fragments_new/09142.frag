uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.45;
	vec3 mq = mod(q, 2.13) - 1.06;
	return length(mq) - 0.35;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.06, 1.06, -3.0);
	vec3 rd = normalize(vec3(p, 1.25));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.32);
	vec3 col = palette(tt * 0.38 + time * 0.30, vec3(0.47, 0.56, 0.53), vec3(0.31, 0.35, 0.35), vec3(1.35, 1.24, 0.90), vec3(0.91, 0.80, 0.41)) * fog;
	col += vec3(0.26, 0.80, 0.55) * (it / 60.0) * 0.54;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

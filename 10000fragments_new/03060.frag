uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.20;
	vec3 mq = mod(q, 2.10) - 1.05;
	return length(mq) - 0.36;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.05, 1.05, -3.0);
	vec3 rd = normalize(vec3(p, 1.25));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.63;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.20 + time * 0.21, vec3(0.40, 0.57, 0.51), vec3(0.45, 0.32, 0.38), vec3(0.94, 0.84, 0.71), vec3(0.04, 0.63, 0.94)) * fog;
	col += vec3(0.45, 0.66, 0.83) * (it / 64.0) * 0.45;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

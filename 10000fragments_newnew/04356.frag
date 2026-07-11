uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.24;
	vec3 mq = mod(q, 2.30) - 1.15;
	return length(mq) - 0.28;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.15, 1.15, -3.0);
	vec3 rd = normalize(vec3(p, 1.42));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.37);
	vec3 col = palette(tt * 0.21 + time * 0.02, vec3(0.47, 0.41, 0.56), vec3(0.48, 0.35, 0.46), vec3(1.30, 1.24, 0.85), vec3(0.02, 0.48, 0.51)) * fog;
	col += vec3(0.42, 0.38, 0.57) * (it / 54.0) * 0.52;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.44;
	vec3 mq = mod(q, 2.16) - 1.08;
	return length(mq) - 0.47;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.08, 1.08, -3.0);
	vec3 rd = normalize(vec3(p, 1.19));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.31 + time * 0.31, vec3(0.50, 0.56, 0.48), vec3(0.39, 0.49, 0.35), vec3(1.03, 0.85, 0.83), vec3(0.71, 0.86, 0.41)) * fog;
	col += vec3(0.95, 0.46, 0.76) * (it / 69.0) * 0.77;
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.48;
	vec3 mq = mod(q, 1.86) - 0.93;
	return length(mq) - 0.29;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.93, 0.93, -3.0);
	vec3 rd = normalize(vec3(p, 1.76));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.22 + time * 0.24, vec3(0.56, 0.48, 0.40), vec3(0.38, 0.34, 0.49), vec3(0.94, 0.83, 1.05), vec3(0.39, 0.41, 0.27)) * fog;
	col += vec3(0.98, 0.37, 0.58) * (it / 59.0) * 1.00;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

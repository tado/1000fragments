uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.28;
	vec3 mq = mod(q, 2.18) - 1.09;
	return length(mq) - 0.37;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.09, 1.09, -3.0);
	vec3 rd = normalize(vec3(p, 0.95));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.34 + time * 0.20, vec3(0.43, 0.45, 0.57), vec3(0.39, 0.30, 0.48), vec3(0.89, 1.09, 0.80), vec3(0.28, 1.00, 0.89)) * fog;
	col += vec3(0.81, 0.43, 0.35) * (it / 49.0) * 0.81;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

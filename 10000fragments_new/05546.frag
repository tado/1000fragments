uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.30;
	vec3 mq = mod(q, 1.86) - 0.93;
	return length(mq) - 0.32;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.93, 0.93, -3.0);
	vec3 rd = normalize(vec3(p, 1.29));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.38 + time * 0.40, vec3(0.55, 0.52, 0.44), vec3(0.44, 0.43, 0.37), vec3(0.97, 0.79, 0.97), vec3(0.77, 0.13, 0.43)) * fog;
	col += vec3(0.33, 1.00, 0.23) * (it / 59.0) * 0.44;
	col *= 0.85 + 0.14 * sin(gl_FragCoord.y * 2.96 + time * 8.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.94;
	vec3 mq = mod(q, 2.43) - 1.21;
	return length(mq) - 0.46;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.21, 1.21, -3.0);
	vec3 rd = normalize(vec3(p, 1.16));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.17 + time * 0.01, vec3(0.52, 0.54, 0.50), vec3(0.46, 0.32, 0.37), vec3(0.91, 1.21, 1.04), vec3(0.43, 0.85, 0.81)) * fog;
	col += vec3(0.31, 0.79, 0.74) * (it / 61.0) * 0.91;
	col *= 0.81 + 0.19 * sin(gl_FragCoord.y * 1.46 + time * 6.57);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

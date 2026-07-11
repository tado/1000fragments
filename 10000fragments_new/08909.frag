uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.48;
	vec3 mq = mod(q, 1.93) - 0.96;
	return length(mq) - 0.49;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.96, 0.96, -3.0);
	vec3 rd = normalize(vec3(p, 1.20));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.29 + time * 0.19, vec3(0.54, 0.56, 0.56), vec3(0.49, 0.48, 0.45), vec3(0.74, 1.21, 1.18), vec3(0.62, 0.93, 0.49)) * fog;
	col += vec3(0.63, 0.53, 0.92) * (it / 63.0) * 0.51;
	col *= 0.87 + 0.16 * sin(gl_FragCoord.y * 1.10 + time * 5.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

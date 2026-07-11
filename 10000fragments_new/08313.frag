uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.79;
	vec3 mq = mod(q, 1.97) - 0.99;
	return length(mq) - 0.26;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.99, 0.99, -3.0);
	vec3 rd = normalize(vec3(p, 1.48));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.39 + time * 0.34, vec3(0.53, 0.60, 0.51), vec3(0.48, 0.30, 0.34), vec3(1.21, 1.19, 0.96), vec3(0.08, 0.94, 0.19)) * fog;
	col += vec3(0.64, 0.70, 0.65) * (it / 71.0) * 0.94;
	col *= 0.90 + 0.17 * sin(gl_FragCoord.y * 0.86 + time * 4.72);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

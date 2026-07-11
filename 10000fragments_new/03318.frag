uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.42;
	vec3 mq = mod(q, 1.73) - 0.87;
	return length(mq) - 0.50;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.87, 0.87, -3.0);
	vec3 rd = normalize(vec3(p, 1.26));
	rd.xy = rot2(time * 0.32) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.24 + time * 0.10, vec3(0.47, 0.46, 0.47), vec3(0.35, 0.37, 0.35), vec3(0.89, 0.81, 1.05), vec3(0.34, 0.17, 0.58)) * fog;
	col += vec3(0.51, 0.93, 0.77) * (it / 65.0) * 0.84;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.82;
	vec3 mq = mod(q, 2.32) - 1.16;
	return length(mq) - 0.34;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.16, 1.16, -3.0);
	vec3 rd = normalize(vec3(p, 0.90));
	rd.xy = rot2(time * 0.10) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 68; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.43);
	vec3 col = palette(tt * 0.29 + time * 0.31, vec3(0.46, 0.51, 0.45), vec3(0.37, 0.47, 0.37), vec3(0.97, 1.21, 0.93), vec3(0.26, 0.04, 0.85)) * fog;
	col += vec3(0.87, 0.85, 0.35) * (it / 68.0) * 0.69;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

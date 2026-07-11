uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.99;
	vec3 mq = mod(q, 2.43) - 1.21;
	return length(mq) - 0.46;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.21, 1.21, -3.0);
	vec3 rd = normalize(vec3(p, 1.47));
	rd.xy = rot2(time * 0.13) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.35 + time * 0.17, vec3(0.49, 0.44, 0.46), vec3(0.32, 0.38, 0.45), vec3(1.12, 1.20, 0.72), vec3(0.48, 0.43, 0.85)) * fog;
	col += vec3(0.72, 0.60, 0.96) * (it / 53.0) * 0.42;
	col *= 0.81 + 0.14 * sin(gl_FragCoord.y * 1.31 + time * 5.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.31;
	vec3 mq = mod(q, 1.88) - 0.94;
	return length(mq) - 0.42;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.94, 0.94, -3.0);
	vec3 rd = normalize(vec3(p, 1.23));
	rd.xy = rot2(time * -0.29) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.32 + time * 0.06, vec3(0.45, 0.54, 0.42), vec3(0.32, 0.31, 0.35), vec3(1.14, 0.83, 0.99), vec3(0.48, 0.13, 0.42)) * fog;
	col += vec3(0.47, 0.70, 0.91) * (it / 72.0) * 0.78;
	col = mod(col * 2.13, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

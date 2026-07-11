uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.82;
	vec3 mq = mod(q, 2.58) - 1.29;
	mq.xy = rot2(time * 1.22) * mq.xy;
	vec3 b = abs(mq) - vec3(0.22);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.29, 1.29, -3.0);
	vec3 rd = normalize(vec3(p, 1.48));
	rd.xy = rot2(time * -0.29) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.15 + time * 0.07, vec3(0.58, 0.47, 0.58), vec3(0.30, 0.48, 0.33), vec3(1.23, 0.96, 1.12), vec3(0.45, 0.64, 0.32)) * fog;
	col += vec3(1.00, 0.61, 0.55) * (it / 62.0) * 0.77;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

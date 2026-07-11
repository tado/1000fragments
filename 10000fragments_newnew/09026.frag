uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.82;
	vec3 mq = mod(q, 2.76) - 1.38;
	mq.xy = rot2(time * -0.63) * mq.xy;
	vec3 b = abs(mq) - vec3(0.21);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.38, 1.38, -3.0);
	vec3 rd = normalize(vec3(p, 1.55));
	rd.xy = rot2(time * -0.17) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.32);
	vec3 col = palette(tt * 0.23 + time * 0.23, vec3(0.58, 0.60, 0.58), vec3(0.48, 0.47, 0.40), vec3(1.20, 1.17, 1.15), vec3(0.10, 0.93, 0.62)) * fog;
	col += vec3(0.96, 0.77, 0.88) * (it / 58.0) * 0.96;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

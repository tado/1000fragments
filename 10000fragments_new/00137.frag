uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.21;
	vec3 mq = mod(q, 1.91) - 0.96;
	mq.xy = rot2(time * -0.74) * mq.xy;
	vec3 b = abs(mq) - vec3(0.38);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.96, 0.96, -3.0);
	vec3 rd = normalize(vec3(p, 1.63));
	rd.xy = rot2(time * -0.22) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.38 + time * 0.30, vec3(0.55, 0.60, 0.49), vec3(0.44, 0.49, 0.47), vec3(1.05, 0.82, 1.30), vec3(0.27, 0.89, 0.44)) * fog;
	col += vec3(0.42, 0.81, 0.98) * (it / 62.0) * 0.82;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

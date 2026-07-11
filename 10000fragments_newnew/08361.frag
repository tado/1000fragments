uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.13;
	vec3 mq = mod(q, 2.55) - 1.28;
	mq.xy = rot2(time * -1.96) * mq.xy;
	vec3 b = abs(mq) - vec3(0.36);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.28, 1.28, -3.0);
	vec3 rd = normalize(vec3(p, 1.01));
	rd.xy = rot2(time * 0.19) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.32 + time * 0.18, vec3(0.44, 0.59, 0.49), vec3(0.36, 0.50, 0.37), vec3(1.21, 1.10, 0.86), vec3(0.75, 0.68, 0.78)) * fog;
	col += vec3(0.47, 0.47, 0.29) * (it / 48.0) * 0.49;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

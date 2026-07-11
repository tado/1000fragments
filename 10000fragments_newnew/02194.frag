uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.72;
	vec3 mq = mod(q, 2.38) - 1.19;
	mq.xy = rot2(time * 1.84) * mq.xy;
	vec3 b = abs(mq) - vec3(0.28);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.19, 1.19, -3.0);
	vec3 rd = normalize(vec3(p, 1.77));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.23);
	vec3 col = palette(tt * 0.18 + time * 0.34, vec3(0.58, 0.43, 0.59), vec3(0.31, 0.49, 0.48), vec3(1.17, 0.89, 0.88), vec3(0.25, 0.29, 0.37)) * fog;
	col += vec3(0.41, 0.61, 0.92) * (it / 53.0) * 0.70;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.69;
	vec3 mq = mod(q, 2.12) - 1.06;
	mq.xy = rot2(time * 0.72) * mq.xy;
	vec3 b = abs(mq) - vec3(0.34);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.06, 1.06, -3.0);
	vec3 rd = normalize(vec3(p, 1.19));
	rd.xy = rot2(time * 0.23) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 62; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.63;
		it += 1.0;
	}
	float fog = exp(-tt * 0.45);
	vec3 col = palette(tt * 0.31 + time * 0.28, vec3(0.41, 0.56, 0.40), vec3(0.41, 0.44, 0.45), vec3(0.97, 1.31, 1.29), vec3(0.86, 0.77, 0.14)) * fog;
	col += vec3(0.57, 0.22, 0.72) * (it / 62.0) * 0.84;
	col = clamp((col - 0.5) * 2.18 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

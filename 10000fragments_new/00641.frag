uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.36;
	vec3 mq = mod(q, 2.43) - 1.22;
	mq.xy = rot2(time * 0.67) * mq.xy;
	vec3 b = abs(mq) - vec3(0.27);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.22, 1.22, -3.0);
	vec3 rd = normalize(vec3(p, 1.08));
	rd.xy = rot2(time * -0.30) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.35);
	vec3 col = palette(tt * 0.40 + time * 0.04, vec3(0.50, 0.48, 0.45), vec3(0.38, 0.46, 0.30), vec3(1.35, 1.01, 1.21), vec3(0.08, 0.30, 0.77)) * fog;
	col += vec3(0.66, 0.31, 0.30) * (it / 55.0) * 0.72;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

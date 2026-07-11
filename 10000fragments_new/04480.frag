uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.88;
	vec3 mq = mod(q, 2.61) - 1.31;
	mq.xy = rot2(time * -1.92) * mq.xy;
	vec3 b = abs(mq) - vec3(0.41);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.31, 1.31, -3.0);
	vec3 rd = normalize(vec3(p, 1.48));
	rd.xy = rot2(time * -0.18) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.32 + time * 0.27, vec3(0.58, 0.54, 0.41), vec3(0.40, 0.35, 0.31), vec3(0.92, 1.00, 1.09), vec3(0.96, 0.14, 0.69)) * fog;
	col += vec3(0.43, 0.28, 0.52) * (it / 48.0) * 0.95;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

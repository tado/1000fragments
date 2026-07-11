uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.62;
	vec3 mq = mod(q, 2.23) - 1.11;
	mq.xy = rot2(time * -1.29) * mq.xy;
	vec3 b = abs(mq) - vec3(0.26);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.11, 1.11, -3.0);
	vec3 rd = normalize(vec3(p, 1.32));
	rd.xy = rot2(time * -0.31) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.32);
	vec3 col = palette(tt * 0.23 + time * 0.24, vec3(0.53, 0.60, 0.50), vec3(0.41, 0.42, 0.35), vec3(0.91, 1.25, 0.86), vec3(0.61, 0.86, 0.55)) * fog;
	col += vec3(1.00, 0.49, 0.22) * (it / 66.0) * 0.91;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

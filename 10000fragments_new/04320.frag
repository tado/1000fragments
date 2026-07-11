uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.11;
	vec3 mq = mod(q, 2.46) - 1.23;
	mq.xy = rot2(time * 1.06) * mq.xy;
	vec3 b = abs(mq) - vec3(0.24);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.23, 1.23, -3.0);
	vec3 rd = normalize(vec3(p, 1.37));
	rd.xy = rot2(time * -0.14) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.19 + time * 0.06, vec3(0.59, 0.49, 0.58), vec3(0.50, 0.44, 0.31), vec3(0.71, 1.09, 0.99), vec3(0.65, 0.94, 0.67)) * fog;
	col += vec3(0.67, 0.61, 0.69) * (it / 61.0) * 0.78;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

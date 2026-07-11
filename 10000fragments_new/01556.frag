uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.83;
	vec3 mq = mod(q, 2.46) - 1.23;
	mq.xy = rot2(time * -0.78) * mq.xy;
	vec3 b = abs(mq) - vec3(0.27);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.23, 1.23, -3.0);
	vec3 rd = normalize(vec3(p, 1.26));
	rd.xy = rot2(time * -0.35) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 50; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = palette(tt * 0.29 + time * 0.30, vec3(0.48, 0.43, 0.43), vec3(0.42, 0.32, 0.49), vec3(1.18, 1.31, 0.74), vec3(0.03, 0.26, 0.09)) * fog;
	col += vec3(0.40, 0.31, 0.73) * (it / 50.0) * 0.92;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

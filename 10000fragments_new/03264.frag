uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.96;
	vec3 mq = mod(q, 2.72) - 1.36;
	mq.xy = rot2(time * -1.50) * mq.xy;
	vec3 b = abs(mq) - vec3(0.34);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.36, 1.36, -3.0);
	vec3 rd = normalize(vec3(p, 1.08));
	rd.xy = rot2(time * -0.37) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.86;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.18 + time * 0.39, vec3(0.45, 0.53, 0.54), vec3(0.36, 0.32, 0.47), vec3(1.27, 1.12, 0.93), vec3(0.50, 0.85, 0.10)) * fog;
	col += vec3(0.62, 0.77, 0.81) * (it / 70.0) * 0.78;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

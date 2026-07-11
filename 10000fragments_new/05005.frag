uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.16;
	vec3 mq = mod(q, 2.02) - 1.01;
	mq.xy = rot2(time * 0.64) * mq.xy;
	vec3 b = abs(mq) - vec3(0.40);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.01, 1.01, -3.0);
	vec3 rd = normalize(vec3(p, 1.58));
	rd.xy = rot2(time * 0.08) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.32 + time * 0.17, vec3(0.58, 0.49, 0.44), vec3(0.46, 0.48, 0.34), vec3(1.29, 0.79, 0.83), vec3(0.51, 0.45, 0.38)) * fog;
	col += vec3(0.61, 0.45, 0.77) * (it / 58.0) * 0.80;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

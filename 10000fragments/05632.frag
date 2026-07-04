uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.03;
	vec3 mq = mod(q, 2.72) - 1.36;
	mq.xy = rot2(time * 0.55) * mq.xy;
	vec3 b = abs(mq) - vec3(0.28);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.36, 1.36, -3.0);
	vec3 rd = normalize(vec3(p, 1.35));
	rd.xy = rot2(time * -0.38) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.13 + time * 0.38, vec3(0.42, 0.54, 0.55), vec3(0.48, 0.42, 0.39), vec3(1.32, 1.32, 1.19), vec3(0.46, 0.68, 0.84)) * fog;
	col += vec3(0.32, 0.72, 0.45) * (it / 60.0) * 0.54;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

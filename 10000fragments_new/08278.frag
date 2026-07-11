uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.35;
	vec3 mq = mod(q, 2.21) - 1.11;
	mq.xy = rot2(time * 0.66) * mq.xy;
	vec3 b = abs(mq) - vec3(0.36);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.11, 1.11, -3.0);
	vec3 rd = normalize(vec3(p, 1.76));
	rd.xy = rot2(time * -0.09) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.29 + time * 0.38, vec3(0.57, 0.45, 0.59), vec3(0.36, 0.39, 0.42), vec3(0.88, 1.12, 1.26), vec3(0.28, 0.87, 0.07)) * fog;
	col += vec3(0.81, 0.75, 0.96) * (it / 65.0) * 0.92;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

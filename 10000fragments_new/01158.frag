uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.17;
	vec3 mq = mod(q, 2.67) - 1.34;
	mq.xy = rot2(time * -1.78) * mq.xy;
	vec3 b = abs(mq) - vec3(0.30);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.34, 1.34, -3.0);
	vec3 rd = normalize(vec3(p, 1.51));
	rd.xy = rot2(time * 0.25) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = palette(tt * 0.16 + time * 0.40, vec3(0.48, 0.58, 0.49), vec3(0.48, 0.35, 0.44), vec3(1.37, 1.06, 0.93), vec3(0.57, 0.42, 0.85)) * fog;
	col += vec3(0.23, 0.79, 0.36) * (it / 60.0) * 0.69;
	col = clamp((col - 0.5) * 2.10 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.62;
	vec3 mq = mod(q, 2.63) - 1.32;
	mq.xy = rot2(time * -1.98) * mq.xy;
	vec3 b = abs(mq) - vec3(0.30);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.32, 1.32, -3.0);
	vec3 rd = normalize(vec3(p, 0.90));
	rd.xy = rot2(time * 0.28) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.71;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = palette(tt * 0.27 + time * 0.21, vec3(0.41, 0.55, 0.45), vec3(0.45, 0.40, 0.46), vec3(1.07, 1.26, 1.34), vec3(0.52, 0.79, 0.20)) * fog;
	col += vec3(0.33, 0.34, 0.35) * (it / 52.0) * 0.93;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

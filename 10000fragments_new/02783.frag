uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.98;
	vec3 mq = mod(q, 2.32) - 1.16;
	mq.xy = rot2(time * 0.83) * mq.xy;
	vec3 b = abs(mq) - vec3(0.22);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.16, 1.16, -3.0);
	vec3 rd = normalize(vec3(p, 1.15));
	rd.xy = rot2(time * 0.13) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.12 + time * 0.21, vec3(0.52, 0.50, 0.44), vec3(0.36, 0.40, 0.38), vec3(1.18, 1.03, 0.90), vec3(0.59, 0.31, 0.00)) * fog;
	col += vec3(0.29, 0.41, 0.90) * (it / 69.0) * 0.46;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

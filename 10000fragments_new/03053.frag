uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.08;
	vec3 mq = mod(q, 1.88) - 0.94;
	mq.xy = rot2(time * -1.74) * mq.xy;
	vec3 b = abs(mq) - vec3(0.25);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.94, 0.94, -3.0);
	vec3 rd = normalize(vec3(p, 0.97));
	rd.xy = rot2(time * 0.16) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.15);
	vec3 col = palette(tt * 0.35 + time * 0.28, vec3(0.58, 0.49, 0.57), vec3(0.40, 0.42, 0.46), vec3(1.13, 1.20, 0.96), vec3(0.21, 0.03, 0.01)) * fog;
	col += vec3(0.30, 0.88, 0.32) * (it / 52.0) * 0.52;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

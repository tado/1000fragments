uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.96;
	vec3 mq = mod(q, 2.10) - 1.05;
	mq.xy = rot2(time * 1.08) * mq.xy;
	vec3 b = abs(mq) - vec3(0.34);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.05, 1.05, -3.0);
	vec3 rd = normalize(vec3(p, 1.25));
	rd.xy = rot2(time * 0.09) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.45);
	vec3 col = palette(tt * 0.31 + time * 0.14, vec3(0.41, 0.47, 0.58), vec3(0.35, 0.32, 0.48), vec3(1.09, 0.81, 1.15), vec3(0.90, 0.96, 0.39)) * fog;
	col += vec3(0.67, 0.56, 0.23) * (it / 64.0) * 0.48;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

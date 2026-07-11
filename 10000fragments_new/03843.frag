uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.04;
	vec3 mq = mod(q, 2.24) - 1.12;
	mq.xy = rot2(time * 0.63) * mq.xy;
	vec3 b = abs(mq) - vec3(0.38);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.12, 1.12, -3.0);
	vec3 rd = normalize(vec3(p, 0.99));
	rd.xy = rot2(time * 0.19) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.33 + time * 0.31, vec3(0.56, 0.42, 0.41), vec3(0.33, 0.35, 0.47), vec3(1.01, 1.27, 1.12), vec3(0.94, 0.28, 0.43)) * fog;
	col += vec3(0.86, 0.85, 0.65) * (it / 51.0) * 0.94;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.59 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

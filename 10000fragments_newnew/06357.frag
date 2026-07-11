uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.87;
	vec3 mq = mod(q, 2.68) - 1.34;
	mq.xy = rot2(time * -1.37) * mq.xy;
	vec3 b = abs(mq) - vec3(0.35);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.34, 1.34, -3.0);
	vec3 rd = normalize(vec3(p, 1.38));
	rd.xy = rot2(time * -0.18) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.18 + time * 0.21, vec3(0.59, 0.49, 0.60), vec3(0.32, 0.47, 0.42), vec3(1.34, 1.12, 1.05), vec3(0.34, 0.53, 0.34)) * fog;
	col += vec3(0.37, 0.90, 0.35) * (it / 53.0) * 0.50;
	col = mod(col * 2.53, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

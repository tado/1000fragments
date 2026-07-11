uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.13;
	vec3 mq = mod(q, 1.99) - 0.99;
	mq.xy = rot2(time * 1.35) * mq.xy;
	vec3 b = abs(mq) - vec3(0.30);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.99, 0.99, -3.0);
	vec3 rd = normalize(vec3(p, 1.49));
	rd.xy = rot2(time * 0.23) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 53; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.64;
		it += 1.0;
	}
	float fog = exp(-tt * 0.15);
	vec3 col = palette(tt * 0.34 + time * 0.36, vec3(0.53, 0.50, 0.50), vec3(0.35, 0.45, 0.48), vec3(0.94, 0.95, 0.99), vec3(0.82, 0.47, 0.33)) * fog;
	col += vec3(0.44, 0.88, 0.28) * (it / 53.0) * 0.34;
	col *= 0.83 + 0.13 * sin(gl_FragCoord.y * 1.63 + time * 13.65);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

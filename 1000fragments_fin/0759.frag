uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.z += (time * 0.71) * 0.68;
	vec3 mq = mod(q, 2.54) - 1.27;
	mq.xy = rot2((time * 0.71) * -1.19) * mq.xy;
	vec3 b = abs(mq) - vec3(0.34);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.51;
	vec3 ro = vec3(1.27, 1.27, -3.0);
	vec3 rd = normalize(vec3(p, 1.18));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.26 + (time * 0.71) * 0.00, vec3(0.50, 0.35, 0.48), vec3(0.36, 0.29, 0.34), vec3(0.96, 0.98, 0.96), vec3(0.82, 0.92, 0.13)) * fog;
	col += vec3(0.64, 0.46, 0.25) * (it / 57.0) * 0.50;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(1.028, 0.988, 0.940);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

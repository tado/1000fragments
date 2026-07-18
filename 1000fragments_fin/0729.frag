uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.z += (time * 0.55) * 1.01;
	vec3 mq = mod(q, 2.63) - 1.32;
	mq.xy = rot2((time * 0.55) * 1.52) * mq.xy;
	vec3 b = abs(mq) - vec3(0.36);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.30;
	p.y = abs(p.y) - 0.43;
	vec3 ro = vec3(1.32, 1.32, -3.0);
	vec3 rd = normalize(vec3(p, 1.28));
	rd.xy = rot2((time * 0.55) * -0.06) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.11 + (time * 0.55) * 0.02, vec3(0.51, 0.50, 0.53), vec3(0.52, 0.53, 0.47), vec3(1.04, 0.98, 0.96), vec3(-0.03, 0.29, 0.66)) * fog;
	col += vec3(0.29, 0.54, 0.44) * (it / 58.0) * 0.38;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.49));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.042, 1.009, 0.922);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

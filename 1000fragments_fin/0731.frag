uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.z += (time * 0.60) * 1.13;
	vec3 mq = mod(q, 2.35) - 1.18;
	mq.xy = rot2((time * 0.60) * 1.48) * mq.xy;
	vec3 b = abs(mq) - vec3(0.30);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.85;
	vec3 ro = vec3(1.18, 1.18, -3.0);
	vec3 rd = normalize(vec3(p, 1.26));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.80;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.31 + (time * 0.60) * 0.40, vec3(0.76, 0.60, 0.64), vec3(0.22, 0.24, 0.22), vec3(0.98, 0.97, 1.00), vec3(0.89, 0.07, 0.12)) * fog;
	col += vec3(0.61, 0.81, 0.43) * (it / 52.0) * 0.31;
	col = clamp((col - 0.5) * 1.53 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.029, 0.962, 1.022);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

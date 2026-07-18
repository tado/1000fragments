uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.xz = rot2((time * 0.62) * 1.17) * q.xz;
	q.xy = rot2((time * 0.62) * 0.80) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.80, q.y);
	return length(w) - 0.36;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y = abs(p.y);
	vec3 ro = vec3(0.0, 0.0, -3.18);
	vec3 rd = normalize(vec3(p, 1.67));
	rd.xy = rot2((time * 0.62) * 0.25) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.88;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.33 + (time * 0.62) * 0.20, vec3(0.51, 0.49, 0.49), vec3(0.51, 0.50, 0.52), vec3(1.01, 0.99, 1.03), vec3(-0.04, 0.36, 0.67)) * fog;
	col += vec3(0.36, 0.58, 0.64) * (it / 49.0) * 0.32;
	col = clamp((col - 0.5) * 1.61 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.961, 1.010, 0.945);
	col += 0.004;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

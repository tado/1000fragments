uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	float sc = 1.0;
	for(int ki = 0; ki < 4; ki++){
		q = abs(q) - vec3(0.60, 0.71, 0.44);
		q.xy = rot2(1.33 + (time * 0.71) * 0.21) * q.xy;
		q.xz = rot2(0.80) * q.xz;
		q *= 1.43; sc *= 1.43;
	}
	vec3 b = abs(q) - vec3(0.55);
	return (length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0)) / sc;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x = abs(p.x);
	vec3 ro = vec3(0.0, 0.0, -2.85);
	vec3 rd = normalize(vec3(p, 1.42));
	rd.xy = rot2((time * 0.71) * 0.17) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.25 + (time * 0.71) * 0.18, vec3(0.59, 0.72, 0.83), vec3(0.27, 0.17, 0.17), vec3(0.96, 0.98, 1.03), vec3(0.49, 0.59, 0.65)) * fog;
	col += vec3(0.39, 0.62, 0.95) * (it / 48.0) * 0.57;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(1.025, 1.009, 0.932);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.22 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

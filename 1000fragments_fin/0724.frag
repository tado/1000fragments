uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.xz = rot2((time * 0.75) * 0.49) * q.xz;
	q.xy = rot2((time * 0.75) * 0.91) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.83, q.y);
	return length(w) - 0.36;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p += vec2(sin((time * 0.75) * 0.70), cos((time * 0.75) * 0.42)) * 0.21;
	p.x += p.y * 0.64;
	vec3 ro = vec3(0.0, 0.0, -2.87);
	vec3 rd = normalize(vec3(p, 0.92));
	rd.xy = rot2((time * 0.75) * 0.15) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.31 + (time * 0.75) * 0.17, vec3(0.72, 0.59, 0.65), vec3(0.27, 0.22, 0.17), vec3(1.01, 1.01, 0.96), vec3(0.92, 0.09, 0.11)) * fog;
	col += vec3(0.83, 0.86, 0.64) * (it / 72.0) * 0.88;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(1.006, 0.947, 1.012);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.33 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

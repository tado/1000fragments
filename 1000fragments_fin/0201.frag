uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 1.12;
	p.x = abs(p.x) - 0.42;
	p *= 0.93;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 8; ci++){
		q = abs(q) - 0.62;
		q = rot2(1.06 + sin((time * 0.59) * 0.90) * 0.24) * q;
		q *= 1.12;
		d1 = min(d1, abs(q.y));
		d2 = min(d2, length(q - vec2(0.46, 0.20)));
	}
	vec3 col = mix(vec3(0.026, 0.052, 0.070), vec3(0.043, 0.062, 0.074), clamp(0.5 + p.y * -0.59 + p.x * 0.04, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(4.826, 5.559, 6.293) + 3.96 + (time * 0.59) * 0.10)) * (0.0102 / (d1 + 0.012));
	col += (0.5 + 0.5 * cos(vec3(4.826, 5.559, 6.293) + 4.22 + (time * 0.59) * 0.52)) * (0.0190 / (d2 + 0.056));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.15);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(0.965, 1.001, 0.952);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

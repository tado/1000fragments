uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y = abs(p.y);
	p *= 0.92;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 8; ci++){
		q = abs(q) - 0.43;
		q = rot2(1.08 + (time * 0.72) * -0.07) * q;
		q *= 1.09;
		d1 = min(d1, abs(length(q) - 0.47));
	}
	vec3 col = mix(vec3(0.038, 0.051, 0.058), vec3(0.059, 0.076, 0.050), clamp(0.5 + p.y * -0.09 + p.x * -0.12, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(6.083, 7.154, 8.224) + 2.42 + (time * 0.72) * 0.24)) * (0.0078 / (d1 + 0.018));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.011, 1.004, 1.013);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

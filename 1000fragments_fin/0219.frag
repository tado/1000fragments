uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x += p.y * -0.36;
	p *= 0.93;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 9; ci++){
		q = abs(q) - 0.55;
		q = rot2(2.56 + sin((time * 0.82) * 0.76) * 0.24) * q;
		q *= 1.06;
		d1 = min(d1, abs(length(q) - 0.35));
	}
	vec3 col = mix(vec3(0.046, 0.028, 0.080), vec3(0.033, 0.062, 0.145), clamp(0.5 + p.y * 0.48 + p.x * -0.02, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(5.247, 6.628, 8.010) + 4.51 + (time * 0.82) * 0.47)) * (0.0064 / (d1 + 0.013));
	col = col / (1.0 + col);
	col *= 0.85 + 0.14 * sin(gl_FragCoord.y * 1.69 + (time * 0.82) * 6.51);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(1.042, 0.988, 0.935);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.41 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

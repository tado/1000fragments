uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 5; ci++){
		q = abs(q) - 0.34;
		q = rot2(1.09 + sin((time * 0.74) * 0.73) * 0.13) * q;
		q *= 1.10;
		d1 = min(d1, abs(length(q) - 0.49));
		d2 = min(d2, length(q - vec2(0.27, -0.25)));
	}
	vec3 col = mix(vec3(0.029, 0.046, 0.085), vec3(0.039, 0.069, 0.121), clamp(0.5 + p.y * -0.34 + p.x * -0.18, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(6.025, 8.045, 10.064) + 3.81 + (time * 0.74) * 0.25)) * (0.0130 / (d1 + 0.016));
	col += (0.5 + 0.5 * cos(vec3(6.025, 8.045, 10.064) + 4.05 + (time * 0.74) * 0.51)) * (0.0166 / (d2 + 0.025));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.25);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(0.971, 0.999, 0.948);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

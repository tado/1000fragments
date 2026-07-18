uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y = abs(p.y) - 0.23;
	p.x += p.y * -0.49;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 5; ci++){
		q = abs(q) - 0.54;
		q = rot2(0.36 + sin((time * 0.63) * 0.71) * 0.08) * q;
		q *= 1.14;
		d1 = min(d1, abs(length(q) - 0.51));
		d2 = min(d2, length(q - vec2(0.17, -0.02)));
	}
	vec3 col = mix(vec3(0.043, 0.040, 0.098), vec3(0.058, 0.045, 0.082), clamp(0.5 + p.y * 0.29 + p.x * 0.02, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(5.319, 6.887, 8.455) + 1.07 + (time * 0.63) * 0.33)) * (0.0134 / (d1 + 0.013));
	col += (0.5 + 0.5 * cos(vec3(5.319, 6.887, 8.455) + 4.01 + (time * 0.63) * 0.59)) * (0.0078 / (d2 + 0.038));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.28);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(1.052, 0.997, 0.921);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 0.72;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 9; ci++){
		q = abs(q) - 0.54;
		q = rot2(0.77 + (time * 0.71) * 0.10) * q;
		q *= 1.11;
		d1 = min(d1, abs(q.y));
		d2 = min(d2, length(q - vec2(0.08, -0.42)));
	}
	vec3 col = mix(vec3(0.022, 0.064, 0.057), vec3(0.040, 0.090, 0.056), clamp(0.5 + p.y * 0.57 + p.x * -0.00, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(5.496, 7.412, 9.328) + 4.30 + (time * 0.71) * 0.40)) * (0.0057 / (d1 + 0.017));
	col += (0.5 + 0.5 * cos(vec3(5.496, 7.412, 9.328) + 4.25 + (time * 0.71) * 0.17)) * (0.0081 / (d2 + 0.055));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.68));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.34);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.04);
	col *= vec3(0.949, 0.974, 1.051);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.33 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

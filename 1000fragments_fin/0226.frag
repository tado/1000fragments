uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p = p.yx;
	p.x = abs(p.x) - 0.26;
	p *= 1.47;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 6; ci++){
		q = abs(q) - 0.45;
		q = rot2(0.38 + sin((time * 0.71) * 0.39) * 0.16) * q;
		q *= 1.09;
		d1 = min(d1, abs(q.y));
	}
	vec3 col = mix(vec3(0.057, 0.034, 0.080), vec3(0.053, 0.035, 0.056), clamp(0.5 + p.y * 0.10 + p.x * -0.13, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(5.970, 7.932, 9.895) + 3.62 + (time * 0.71) * 0.49)) * (0.0138 / (d1 + 0.009));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.69));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(0.999, 1.015, 1.009);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.27 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

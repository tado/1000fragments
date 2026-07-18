uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p *= 0.89;
	p.x += p.y * 0.62;
	vec3 col = mix(vec3(0.058, 0.058, 0.071), vec3(0.080, 0.060, 0.079), clamp(0.5 + p.y * 0.34 + p.x * 0.16, 0.0, 1.0));
	for(int ci = 0; ci < 22; ci++){
		float ft = (time * 0.56) * 1.49 - float(ci) * 0.05;
		vec2 cp = cos(ft * 4.0) * 0.84 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(5.712, 6.915, 8.119) + ft * 1.66)) * (0.0103 / (length(p - cp) + 0.018)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(1.017, 0.954, 1.012);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

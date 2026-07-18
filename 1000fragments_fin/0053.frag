uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p = p.yx;
	p.y += sin(p.x * 2.83 + (time * 0.73) * 1.00) * 0.14;
	p *= 0.83;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.076, 0.040, 0.052), vec3(0.099, 0.037, 0.050), clamp(0.5 + p.y * -0.35 + p.x * 0.16, 0.0, 1.0));
	for(int bi = 0; bi < 6; bi++){
		float fb = float(bi);
		float pn = floor(3.44 + fb * 0.55);
		float aa = an * pn + fb * 1.44 + (time * 0.73) * 0.24 * (1.0 + fb * 0.37);
		float pr = (0.23 + fb * 0.17) * (1.0 + 0.28 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(3.857, 5.012, 6.167) + fb * 0.95 + (time * 0.73) * 0.40);
		float pet = smoothstep(0.017, -0.042, dd);
		pet *= 0.69 + 0.22 * cos(aa);
		col = mix(col, tone, pet * 0.49);
	}
	col = clamp((col - 0.5) * 2.10 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(1.013, 0.975, 0.950);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p += vec2(sin((time * 0.89) * 0.76), cos((time * 0.89) * 1.06)) * 0.22;
	p.y += sin(p.x * 2.90 + (time * 0.89) * 1.24) * 0.12;
	p *= 0.82;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.057, 0.047, 0.063), vec3(0.075, 0.057, 0.054), clamp(0.5 + p.y * 0.13 + p.x * -0.03, 0.0, 1.0));
	for(int bi = 0; bi < 4; bi++){
		float fb = float(bi);
		float pn = floor(5.40 + fb * 0.63);
		float aa = an * pn + fb * 0.62 + (time * 0.89) * 0.30 * (1.0 + fb * 0.41);
		float pr = (0.15 + fb * 0.10) * (1.0 + 0.32 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(4.379, 5.622, 6.864) + fb * 0.67 + (time * 0.89) * 0.20);
		float pet = smoothstep(0.029, -0.019, dd);
		pet *= 0.69 + 0.16 * cos(aa);
		col = mix(col, tone, pet * 0.62);
	}
	col = pow(clamp(col, 0.0, 1.0), vec3(1.47));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(1.021, 0.997, 0.960);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

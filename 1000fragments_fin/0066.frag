uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x += p.y * 0.33;
	p.y = abs(p.y) - 0.37;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.065, 0.059, 0.049), vec3(0.054, 0.034, 0.053), clamp(0.5 + p.y * 0.40 + p.x * -0.18, 0.0, 1.0));
	for(int bi = 0; bi < 6; bi++){
		float fb = float(bi);
		float pn = floor(5.49 + fb * 0.86);
		float aa = an * pn + fb * 1.17 + (time * 0.60) * -0.17 * (1.0 + fb * 0.26);
		float pr = (0.30 + fb * 0.18) * (1.0 + 0.30 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(1.651, 3.478, 5.306) + fb * 0.73 + (time * 0.60) * 0.11);
		float pet = smoothstep(0.015, -0.028, dd);
		pet *= 0.79 + 0.21 * cos(aa);
		col = mix(col, tone, pet * 0.55);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.38);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(0.963, 0.997, 0.952);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x = abs(p.x) - 0.39;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.021, 0.034, 0.041), vec3(0.006, 0.025, 0.049), clamp(0.5 + p.y * 0.41 + p.x * -0.21, 0.0, 1.0));
	for(int bi = 0; bi < 3; bi++){
		float fb = float(bi);
		float pn = floor(4.37 + fb * 0.91);
		float aa = an * pn + fb * 0.98 + (time * 0.70) * -0.14 * (1.0 + fb * 0.30);
		float pr = (0.29 + fb * 0.16) * (1.0 + 0.49 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(5.993, 7.685, 9.378) + fb * 1.07 + (time * 0.70) * 0.41);
		float pet = smoothstep(0.029, -0.025, dd);
		pet *= 0.69 + 0.17 * cos(aa);
		col = mix(col, tone, pet * 0.68);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(0.943, 0.973, 1.059);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

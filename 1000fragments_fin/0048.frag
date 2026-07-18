uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p += vec2(sin((time * 0.76) * 1.15), cos((time * 0.76) * 0.57)) * 0.07;
	p *= 1.09;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.051, 0.035, 0.101), vec3(0.061, 0.025, 0.150), clamp(0.5 + p.y * -0.12 + p.x * -0.08, 0.0, 1.0));
	for(int bi = 0; bi < 6; bi++){
		float fb = float(bi);
		float pn = floor(3.31 + fb * 1.50);
		float aa = an * pn + fb * 0.82 + (time * 0.76) * -0.23 * (1.0 + fb * 0.44);
		float pr = (0.29 + fb * 0.16) * (1.0 + 0.29 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(0.120, 1.310, 2.499) + fb * 0.69 + (time * 0.76) * 0.11);
		float pet = smoothstep(0.028, -0.029, dd);
		pet *= 0.68 + 0.27 * cos(aa);
		col = mix(col, tone, pet * 0.59);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(1.002, 0.974, 1.024);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

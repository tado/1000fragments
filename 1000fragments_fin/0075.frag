uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p += vec2(sin((time * 0.62) * 0.97), cos((time * 0.62) * 0.76)) * 0.10;
	p *= 1.18;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.027, 0.051, 0.038), vec3(0.032, 0.067, 0.041), clamp(0.5 + p.y * -0.49 + p.x * -0.22, 0.0, 1.0));
	for(int bi = 0; bi < 5; bi++){
		float fb = float(bi);
		float pn = floor(3.83 + fb * 1.48);
		float aa = an * pn + fb * 1.99 + (time * 0.62) * 0.15 * (1.0 + fb * 0.41);
		float pr = (0.23 + fb * 0.17) * (1.0 + 0.41 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(2.637, 3.492, 4.346) + fb * 0.77 + (time * 0.62) * 0.21);
		float pet = smoothstep(0.042, -0.015, dd);
		pet *= 0.80 + 0.28 * cos(aa);
		col = mix(col, tone, pet * 0.61);
	}
	col = pow(clamp(col, 0.0, 1.0), vec3(1.14));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(1.006, 0.986, 1.003);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

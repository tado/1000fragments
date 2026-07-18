uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y = abs(p.y);
	p *= 1.18;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.017, 0.063, 0.085), vec3(0.020, 0.093, 0.105), clamp(0.5 + p.y * 0.59 + p.x * -0.14, 0.0, 1.0));
	for(int bi = 0; bi < 6; bi++){
		float fb = float(bi);
		float pn = floor(4.25 + fb * 0.53);
		float aa = an * pn + fb * 0.97 + (time * 0.73) * 0.16 * (1.0 + fb * 0.16);
		float pr = (0.27 + fb * 0.14) * (1.0 + 0.39 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(1.561, 3.045, 4.530) + fb * 0.82 + (time * 0.73) * 0.41);
		float pet = smoothstep(0.023, -0.031, dd);
		pet *= 0.69 + 0.15 * cos(aa);
		col = mix(col, tone, pet * 0.78);
	}
	col = pow(clamp(col, 0.0, 1.0), vec3(0.80));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.014, 0.994, 0.994);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

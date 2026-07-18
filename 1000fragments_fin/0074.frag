uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.x = abs(p.x) - 0.46;
	p.x += p.y * 0.37;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.065, 0.060, 0.033), vec3(0.075, 0.038, 0.064), clamp(0.5 + p.y * 0.42 + p.x * -0.06, 0.0, 1.0));
	for(int bi = 0; bi < 6; bi++){
		float fb = float(bi);
		float pn = floor(5.16 + fb * 1.06);
		float aa = an * pn + fb * 1.84 + (time * 0.77) * 0.32 * (1.0 + fb * 0.19);
		float pr = (0.19 + fb * 0.13) * (1.0 + 0.52 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(1.776, 3.364, 4.951) + fb * 0.76 + (time * 0.77) * 0.41);
		float pet = smoothstep(0.028, -0.042, dd);
		pet *= 0.74 + 0.24 * cos(aa);
		col = mix(col, tone, pet * 0.60);
	}
	col = pow(clamp(col, 0.0, 1.0), vec3(1.16));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.020, 0.993, 0.963);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

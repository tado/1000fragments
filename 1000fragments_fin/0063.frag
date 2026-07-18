uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.018, 0.038, 0.059), vec3(0.020, 0.045, 0.088), clamp(0.5 + p.y * 0.21 + p.x * -0.02, 0.0, 1.0));
	for(int bi = 0; bi < 6; bi++){
		float fb = float(bi);
		float pn = floor(3.80 + fb * 0.93);
		float aa = an * pn + fb * 0.67 + (time * 0.73) * -0.18 * (1.0 + fb * 0.39);
		float pr = (0.18 + fb * 0.11) * (1.0 + 0.28 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(3.785, 4.873, 5.961) + fb * 0.96 + (time * 0.73) * 0.28);
		float pet = smoothstep(0.024, -0.036, dd);
		pet *= 0.69 + 0.26 * cos(aa);
		col = mix(col, tone, pet * 0.50);
	}
	col = pow(clamp(col, 0.0, 1.0), vec3(1.43));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(1.017, 0.978, 0.939);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

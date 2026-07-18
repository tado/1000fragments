uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p = p.yx;
	p *= 1.02;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.012, 0.050, 0.068), vec3(0.025, 0.052, 0.099), clamp(0.5 + p.y * 0.36 + p.x * -0.14, 0.0, 1.0));
	for(int bi = 0; bi < 6; bi++){
		float fb = float(bi);
		float pn = floor(4.57 + fb * 0.58);
		float aa = an * pn + fb * 1.38 + (time * 0.79) * -0.20 * (1.0 + fb * 0.39);
		float pr = (0.20 + fb * 0.09) * (1.0 + 0.50 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(2.923, 4.365, 5.808) + fb * 1.07 + (time * 0.79) * 0.13);
		float pet = smoothstep(0.023, -0.012, dd);
		pet *= 0.78 + 0.23 * cos(aa);
		col = mix(col, tone, pet * 0.50);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(1.020, 0.987, 0.948);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

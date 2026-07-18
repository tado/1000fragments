uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 1.23;
	p *= 0.84;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = vec3(0.04, 0.02, 0.06);
	for(int bi = 0; bi < 4; bi++){
		float fb = float(bi);
		float pn = floor(4.84 + fb * 1.08);
		float aa = an * pn + fb * 0.60 + (time * 0.59) * -0.24 * (1.0 + fb * 0.21);
		float pr = (0.29 + fb * 0.16) * (1.0 + 0.29 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(2.823, 4.023, 5.223) + fb * 0.44 + (time * 0.59) * 0.44);
		float pet = smoothstep(0.045, -0.031, dd);
		pet *= 0.75 + 0.15 * cos(aa);
		col = mix(col, tone, pet * 0.59);
	}
	col *= 0.80 + 0.12 * sin(gl_FragCoord.y * 1.37 + (time * 0.59) * 15.96);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(1.014, 0.947, 1.012);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

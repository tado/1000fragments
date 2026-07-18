uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p += vec2(sin((time * 0.70) * 1.10), cos((time * 0.70) * 0.51)) * 0.20;
	p *= 0.89;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.031, 0.046, 0.096), vec3(0.040, 0.062, 0.070), clamp(0.5 + p.y * 0.48 + p.x * 0.16, 0.0, 1.0));
	for(int bi = 0; bi < 4; bi++){
		float fb = float(bi);
		float pn = floor(5.79 + fb * 1.20);
		float aa = an * pn + fb * 0.93 + (time * 0.70) * 0.18 * (1.0 + fb * 0.44);
		float pr = (0.29 + fb * 0.11) * (1.0 + 0.25 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(5.747, 6.617, 7.488) + fb * 0.44 + (time * 0.70) * 0.40);
		float pet = smoothstep(0.021, -0.020, dd);
		pet *= 0.79 + 0.26 * cos(aa);
		col = mix(col, tone, pet * 0.55);
	}
	col = pow(clamp(col, 0.0, 1.0), vec3(1.33));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(1.020, 0.973, 1.003);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

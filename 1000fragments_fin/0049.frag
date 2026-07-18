uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 1.14;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.030, 0.066, 0.058), vec3(0.037, 0.031, 0.074), clamp(0.5 + p.y * -0.27 + p.x * -0.29, 0.0, 1.0));
	for(int bi = 0; bi < 5; bi++){
		float fb = float(bi);
		float pn = floor(4.75 + fb * 1.30);
		float aa = an * pn + fb * 1.50 + (time * 0.57) * 0.34 * (1.0 + fb * 0.43);
		float pr = (0.20 + fb * 0.14) * (1.0 + 0.47 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(0.187, 1.123, 2.058) + fb * 0.40 + (time * 0.57) * 0.35);
		float pet = smoothstep(0.021, -0.026, dd);
		pet *= 0.74 + 0.17 * cos(aa);
		col = mix(col, tone, pet * 0.75);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(1.011, 0.985, 0.939);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

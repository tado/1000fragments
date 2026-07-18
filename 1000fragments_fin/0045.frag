uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.030, 0.063, 0.079), vec3(0.019, 0.064, 0.100), clamp(0.5 + p.y * 0.62 + p.x * -0.24, 0.0, 1.0));
	for(int bi = 0; bi < 5; bi++){
		float fb = float(bi);
		float pn = floor(3.15 + fb * 0.86);
		float aa = an * pn + fb * 0.72 + (time * 0.80) * 0.10 * (1.0 + fb * 0.24);
		float pr = (0.18 + fb * 0.17) * (1.0 + 0.48 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(5.824, 7.242, 8.659) + fb * 0.58 + (time * 0.80) * 0.12);
		float pet = smoothstep(0.042, -0.021, dd);
		pet *= 0.69 + 0.28 * cos(aa);
		col = mix(col, tone, pet * 0.54);
	}
	col = clamp((col - 0.5) * 1.54 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(0.981, 1.015, 0.935);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

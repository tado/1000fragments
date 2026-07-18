uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 1.08;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.049, 0.055, 0.061), vec3(0.061, 0.047, 0.091), clamp(0.5 + p.y * -0.16 + p.x * 0.14, 0.0, 1.0));
	for(int bi = 0; bi < 3; bi++){
		float fb = float(bi);
		float pn = floor(4.37 + fb * 0.83);
		float aa = an * pn + fb * 1.02 + (time * 0.85) * 0.22 * (1.0 + fb * 0.26);
		float pr = (0.21 + fb * 0.11) * (1.0 + 0.36 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(5.578, 6.450, 7.322) + fb * 1.02 + (time * 0.85) * 0.40);
		float pet = smoothstep(0.042, -0.029, dd);
		pet *= 0.71 + 0.16 * cos(aa);
		col = mix(col, tone, pet * 0.60);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(0.984, 0.999, 0.942);
	col += 0.026;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

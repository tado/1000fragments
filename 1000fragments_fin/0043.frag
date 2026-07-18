uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x = abs(p.x);
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.055, 0.038, 0.077), vec3(0.054, 0.065, 0.088), clamp(0.5 + p.y * 0.60 + p.x * 0.27, 0.0, 1.0));
	for(int bi = 0; bi < 4; bi++){
		float fb = float(bi);
		float pn = floor(3.18 + fb * 1.35);
		float aa = an * pn + fb * 1.16 + (time * 0.91) * -0.14 * (1.0 + fb * 0.19);
		float pr = (0.20 + fb * 0.10) * (1.0 + 0.32 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(1.277, 2.682, 4.087) + fb * 1.00 + (time * 0.91) * 0.20);
		float pet = smoothstep(0.040, -0.012, dd);
		pet *= 0.67 + 0.18 * cos(aa);
		col = mix(col, tone, pet * 0.66);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(0.939, 0.972, 1.054);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

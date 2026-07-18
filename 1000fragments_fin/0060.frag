uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p += vec2(sin((time * 0.66) * 1.16), cos((time * 0.66) * 0.77)) * 0.07;
	p.x = abs(p.x) - 0.52;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.047, 0.049, 0.069), vec3(0.065, 0.067, 0.067), clamp(0.5 + p.y * 0.54 + p.x * -0.01, 0.0, 1.0));
	for(int bi = 0; bi < 6; bi++){
		float fb = float(bi);
		float pn = floor(5.33 + fb * 0.61);
		float aa = an * pn + fb * 1.09 + (time * 0.66) * 0.10 * (1.0 + fb * 0.34);
		float pr = (0.22 + fb * 0.10) * (1.0 + 0.46 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(0.923, 2.297, 3.671) + fb * 0.74 + (time * 0.66) * 0.32);
		float pet = smoothstep(0.017, -0.038, dd);
		pet *= 0.65 + 0.22 * cos(aa);
		col = mix(col, tone, pet * 0.75);
	}
	col = clamp((col - 0.5) * 2.20 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.030, 0.986, 0.959);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

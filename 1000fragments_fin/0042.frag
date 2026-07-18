uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y += sin(p.x * 1.74 + (time * 0.66) * 1.15) * 0.07;
	p.x += p.y * -0.45;
	p *= 1.20;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.033, 0.030, 0.091), vec3(0.066, 0.034, 0.122), clamp(0.5 + p.y * 0.49 + p.x * -0.28, 0.0, 1.0));
	for(int bi = 0; bi < 6; bi++){
		float fb = float(bi);
		float pn = floor(5.72 + fb * 0.64);
		float aa = an * pn + fb * 1.86 + (time * 0.66) * -0.13 * (1.0 + fb * 0.31);
		float pr = (0.28 + fb * 0.10) * (1.0 + 0.49 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(1.744, 2.845, 3.946) + fb * 0.99 + (time * 0.66) * 0.38);
		col += tone * (0.0071 / (abs(dd) + 0.021));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.007, 0.969, 1.005);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

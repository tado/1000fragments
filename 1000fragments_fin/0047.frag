uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x = abs(p.x);
	p += vec2(sin((time * 0.84) * 0.41), cos((time * 0.84) * 1.04)) * 0.17;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = vec3(0.09, 0.05, 0.04);
	for(int bi = 0; bi < 4; bi++){
		float fb = float(bi);
		float pn = floor(4.38 + fb * 1.31);
		float aa = an * pn + fb * 0.93 + (time * 0.84) * -0.15 * (1.0 + fb * 0.32);
		float pr = (0.15 + fb * 0.13) * (1.0 + 0.45 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(5.786, 7.034, 8.282) + fb * 0.84 + (time * 0.84) * 0.24);
		col += tone * (0.0115 / (abs(dd) + 0.021));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.28);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.029, 0.946, 1.011);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

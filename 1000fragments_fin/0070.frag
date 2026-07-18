uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 0.84;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.032, 0.031, 0.087), vec3(0.049, 0.036, 0.087), clamp(0.5 + p.y * -0.63 + p.x * -0.03, 0.0, 1.0));
	for(int bi = 0; bi < 6; bi++){
		float fb = float(bi);
		float pn = floor(3.78 + fb * 0.59);
		float aa = an * pn + fb * 0.91 + (time * 0.61) * 0.14 * (1.0 + fb * 0.17);
		float pr = (0.18 + fb * 0.16) * (1.0 + 0.36 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(3.093, 5.180, 7.267) + fb * 0.60 + (time * 0.61) * 0.26);
		col += tone * (0.0074 / (abs(dd) + 0.015));
	}
	col = col / (1.0 + col);
	col *= 0.84 + 0.14 * sin(gl_FragCoord.y * 1.04 + (time * 0.61) * 4.07);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(0.973, 1.018, 0.945);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

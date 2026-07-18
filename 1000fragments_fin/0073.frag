uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p += vec2(sin((time * 0.81) * 1.17), cos((time * 0.81) * 0.36)) * 0.18;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.040, 0.033, 0.100), vec3(0.024, 0.039, 0.085), clamp(0.5 + p.y * -0.44 + p.x * -0.13, 0.0, 1.0));
	for(int bi = 0; bi < 5; bi++){
		float fb = float(bi);
		float pn = floor(5.72 + fb * 0.56);
		float aa = an * pn + fb * 0.65 + (time * 0.81) * -0.11 * (1.0 + fb * 0.41);
		float pr = (0.22 + fb * 0.12) * (1.0 + 0.27 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(0.200, 1.720, 3.240) + fb * 0.59 + (time * 0.81) * 0.45);
		col += tone * (0.0056 / (abs(dd) + 0.009));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.25);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.031, 0.992, 0.940);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

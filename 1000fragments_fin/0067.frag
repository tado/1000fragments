uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p += vec2(sin((time * 0.70) * 0.93), cos((time * 0.70) * 1.15)) * 0.16;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.026, 0.062, 0.089), vec3(0.033, 0.049, 0.107), clamp(0.5 + p.y * 0.59 + p.x * 0.08, 0.0, 1.0));
	for(int bi = 0; bi < 3; bi++){
		float fb = float(bi);
		float pn = floor(3.49 + fb * 1.12);
		float aa = an * pn + fb * 0.96 + (time * 0.70) * -0.20 * (1.0 + fb * 0.28);
		float pr = (0.16 + fb * 0.16) * (1.0 + 0.27 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(2.203, 3.925, 5.648) + fb * 1.02 + (time * 0.70) * 0.31);
		col += tone * (0.0075 / (abs(dd) + 0.014));
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(1.013, 0.988, 1.007);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.x = abs(p.x) - 0.28;
	p *= 1.46;
	p *= 0.86;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = vec3(0.09, 0.10, 0.04);
	for(int bi = 0; bi < 5; bi++){
		float fb = float(bi);
		float pn = floor(5.48 + fb * 1.13);
		float aa = an * pn + fb * 1.79 + (time * 0.88) * 0.30 * (1.0 + fb * 0.42);
		float pr = (0.28 + fb * 0.16) * (1.0 + 0.25 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(5.799, 7.531, 9.264) + fb * 1.04 + (time * 0.88) * 0.14);
		col += tone * (0.0114 / (abs(dd) + 0.016));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.012, 0.956, 1.009);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

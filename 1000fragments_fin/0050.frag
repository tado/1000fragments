uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.069, 0.050, 0.048), vec3(0.088, 0.047, 0.066), clamp(0.5 + p.y * -0.39 + p.x * -0.12, 0.0, 1.0));
	for(int bi = 0; bi < 4; bi++){
		float fb = float(bi);
		float pn = floor(3.86 + fb * 0.77);
		float aa = an * pn + fb * 1.25 + (time * 0.73) * 0.13 * (1.0 + fb * 0.35);
		float pr = (0.24 + fb * 0.18) * (1.0 + 0.34 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(4.141, 5.113, 6.084) + fb * 0.79 + (time * 0.73) * 0.31);
		col += tone * (0.0041 / (abs(dd) + 0.025));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.15);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(0.926, 0.982, 1.047);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.27 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 0.99;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.029, 0.070, 0.056), vec3(0.044, 0.070, 0.064), clamp(0.5 + p.y * -0.60 + p.x * -0.22, 0.0, 1.0));
	for(int bi = 0; bi < 3; bi++){
		float fb = float(bi);
		float pn = floor(4.66 + fb * 0.94);
		float aa = an * pn + fb * 1.04 + (time * 0.83) * 0.21 * (1.0 + fb * 0.23);
		float pr = (0.19 + fb * 0.13) * (1.0 + 0.40 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(0.418, 1.316, 2.215) + fb * 0.99 + (time * 0.83) * 0.43);
		col += tone * (0.0073 / (abs(dd) + 0.019));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.93 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(0.993, 1.011, 1.001);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

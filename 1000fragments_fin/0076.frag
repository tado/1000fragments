uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p = p.yx;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = vec3(0.07, 0.07, 0.06);
	for(int bi = 0; bi < 6; bi++){
		float fb = float(bi);
		float pn = floor(5.14 + fb * 1.16);
		float aa = an * pn + fb * 1.75 + (time * 0.66) * -0.32 * (1.0 + fb * 0.24);
		float pr = (0.16 + fb * 0.10) * (1.0 + 0.44 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(1.251, 2.282, 3.314) + fb * 0.54 + (time * 0.66) * 0.41);
		col += tone * (0.0112 / (abs(dd) + 0.022));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(0.989, 1.008, 0.955);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

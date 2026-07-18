uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y = abs(p.y) - 0.22;
	p.x = abs(p.x);
	p *= 0.84;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.035, 0.038, 0.081), vec3(0.040, 0.044, 0.093), clamp(0.5 + p.y * 0.08 + p.x * -0.09, 0.0, 1.0));
	for(int bi = 0; bi < 4; bi++){
		float fb = float(bi);
		float pn = floor(4.71 + fb * 1.05);
		float aa = an * pn + fb * 0.64 + (time * 0.64) * 0.19 * (1.0 + fb * 0.37);
		float pr = (0.27 + fb * 0.10) * (1.0 + 0.40 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(2.011, 4.046, 6.082) + fb * 0.48 + (time * 0.64) * 0.13);
		col += tone * (0.0076 / (abs(dd) + 0.015));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.50);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(0.940, 0.976, 1.036);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

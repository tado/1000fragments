uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 1.20;
	p *= 1.00;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.065, 0.028, 0.074), vec3(0.063, 0.042, 0.051), clamp(0.5 + p.y * -0.60 + p.x * 0.17, 0.0, 1.0));
	for(int bi = 0; bi < 5; bi++){
		float fb = float(bi);
		float pn = floor(4.95 + fb * 0.99);
		float aa = an * pn + fb * 0.80 + (time * 0.61) * -0.26 * (1.0 + fb * 0.35);
		float pr = (0.18 + fb * 0.14) * (1.0 + 0.49 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(2.298, 3.135, 3.973) + fb * 0.74 + (time * 0.61) * 0.29);
		col += tone * (0.0069 / (abs(dd) + 0.020));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(1.012, 0.987, 0.954);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

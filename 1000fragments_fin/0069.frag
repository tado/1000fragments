uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x += p.y * 0.73;
	p.x = abs(p.x) - 0.29;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = vec3(0.02, 0.02, 0.05);
	for(int bi = 0; bi < 5; bi++){
		float fb = float(bi);
		float pn = floor(3.41 + fb * 1.31);
		float aa = an * pn + fb * 0.65 + (time * 0.64) * 0.12 * (1.0 + fb * 0.20);
		float pr = (0.29 + fb * 0.13) * (1.0 + 0.31 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(6.201, 7.552, 8.902) + fb * 0.54 + (time * 0.64) * 0.44);
		col += tone * (0.0089 / (abs(dd) + 0.020));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(1.008, 0.985, 0.957);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

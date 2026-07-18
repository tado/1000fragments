uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 1.27;
	p *= 1.20;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.041, 0.031, 0.097), vec3(0.051, 0.054, 0.088), clamp(0.5 + p.y * -0.58 + p.x * -0.28, 0.0, 1.0));
	for(int bi = 0; bi < 4; bi++){
		float fb = float(bi);
		float pn = floor(5.94 + fb * 1.22);
		float aa = an * pn + fb * 1.15 + (time * 0.87) * -0.14 * (1.0 + fb * 0.35);
		float pr = (0.27 + fb * 0.15) * (1.0 + 0.32 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(0.908, 2.859, 4.809) + fb * 0.47 + (time * 0.87) * 0.32);
		col += tone * (0.0109 / (abs(dd) + 0.018));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(0.942, 0.983, 1.034);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

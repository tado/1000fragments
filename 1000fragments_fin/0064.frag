uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x += p.y * 0.71;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.044, 0.040, 0.056), vec3(0.077, 0.064, 0.045), clamp(0.5 + p.y * 0.42 + p.x * -0.03, 0.0, 1.0));
	for(int bi = 0; bi < 6; bi++){
		float fb = float(bi);
		float pn = floor(3.27 + fb * 1.27);
		float aa = an * pn + fb * 1.40 + (time * 0.75) * -0.14 * (1.0 + fb * 0.44);
		float pr = (0.30 + fb * 0.14) * (1.0 + 0.33 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(1.488, 2.632, 3.776) + fb * 0.59 + (time * 0.75) * 0.25);
		float pet = smoothstep(0.037, -0.033, dd);
		pet *= 0.75 + 0.24 * cos(aa);
		col = mix(col, tone, pet * 0.53);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(0.963, 1.004, 0.947);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

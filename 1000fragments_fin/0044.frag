uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 0.97;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.042, 0.049, 0.089), vec3(0.044, 0.057, 0.047), clamp(0.5 + p.y * -0.04 + p.x * -0.25, 0.0, 1.0));
	for(int bi = 0; bi < 4; bi++){
		float fb = float(bi);
		float pn = floor(5.43 + fb * 0.89);
		float aa = an * pn + fb * 0.81 + (time * 0.80) * -0.16 * (1.0 + fb * 0.36);
		float pr = (0.26 + fb * 0.14) * (1.0 + 0.49 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(3.549, 5.518, 7.488) + fb * 0.68 + (time * 0.80) * 0.20);
		float pet = smoothstep(0.042, -0.038, dd);
		pet *= 0.68 + 0.17 * cos(aa);
		col = mix(col, tone, pet * 0.71);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(0.940, 0.994, 1.042);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

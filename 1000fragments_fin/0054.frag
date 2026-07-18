uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y = abs(p.y);
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = vec3(0.05, 0.06, 0.09);
	for(int bi = 0; bi < 4; bi++){
		float fb = float(bi);
		float pn = floor(4.50 + fb * 0.92);
		float aa = an * pn + fb * 1.88 + (time * 0.88) * 0.19 * (1.0 + fb * 0.23);
		float pr = (0.27 + fb * 0.11) * (1.0 + 0.36 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(3.028, 3.773, 4.519) + fb * 0.54 + (time * 0.88) * 0.39);
		float pet = smoothstep(0.024, -0.024, dd);
		pet *= 0.72 + 0.21 * cos(aa);
		col = mix(col, tone, pet * 0.50);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(1.013, 1.013, 0.989);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

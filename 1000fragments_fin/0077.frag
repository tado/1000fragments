uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.y += sin(p.x * 2.01 + (time * 0.64) * 1.05) * 0.13;
	p *= 0.81;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.012, 0.035, 0.055), vec3(0.020, 0.028, 0.054), clamp(0.5 + p.y * -0.25 + p.x * -0.15, 0.0, 1.0));
	for(int bi = 0; bi < 5; bi++){
		float fb = float(bi);
		float pn = floor(5.00 + fb * 0.73);
		float aa = an * pn + fb * 1.58 + (time * 0.64) * -0.30 * (1.0 + fb * 0.18);
		float pr = (0.20 + fb * 0.12) * (1.0 + 0.55 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(4.603, 5.316, 6.029) + fb * 0.76 + (time * 0.64) * 0.38);
		float pet = smoothstep(0.027, -0.015, dd);
		pet *= 0.66 + 0.29 * cos(aa);
		col = mix(col, tone, pet * 0.80);
	}
	col = pow(clamp(col, 0.0, 1.0), vec3(0.85));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(1.002, 1.001, 1.002);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.53 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

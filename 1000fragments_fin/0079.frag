uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y += sin(p.x * 1.05 + (time * 0.89) * 1.18) * 0.17;
	p.y = abs(p.y);
	p *= 1.24;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.031, 0.068, 0.060), vec3(0.023, 0.084, 0.044), clamp(0.5 + p.y * 0.18 + p.x * -0.23, 0.0, 1.0));
	for(int bi = 0; bi < 6; bi++){
		float fb = float(bi);
		float pn = floor(4.77 + fb * 0.77);
		float aa = an * pn + fb * 0.65 + (time * 0.89) * 0.24 * (1.0 + fb * 0.28);
		float pr = (0.19 + fb * 0.12) * (1.0 + 0.37 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(2.419, 3.573, 4.726) + fb * 0.92 + (time * 0.89) * 0.36);
		float pet = smoothstep(0.034, -0.014, dd);
		pet *= 0.78 + 0.17 * cos(aa);
		col = mix(col, tone, pet * 0.53);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(1.027, 0.998, 0.932);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

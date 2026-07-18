uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x = abs(p.x);
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.082, 0.054, 0.030), vec3(0.033, 0.038, 0.036), clamp(0.5 + p.y * -0.28 + p.x * 0.03, 0.0, 1.0));
	for(int bi = 0; bi < 5; bi++){
		float fb = float(bi);
		float pn = floor(4.69 + fb * 0.57);
		float aa = an * pn + fb * 1.99 + (time * 0.61) * -0.30 * (1.0 + fb * 0.41);
		float pr = (0.22 + fb * 0.10) * (1.0 + 0.41 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(0.573, 2.471, 4.368) + fb * 0.79 + (time * 0.61) * 0.29);
		float pet = smoothstep(0.017, -0.012, dd);
		pet *= 0.69 + 0.23 * cos(aa);
		col = mix(col, tone, pet * 0.77);
	}
	col = pow(clamp(col, 0.0, 1.0), vec3(1.53));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.022, 0.956, 1.006);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.59 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

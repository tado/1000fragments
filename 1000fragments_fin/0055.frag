uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y = abs(p.y) - 0.56;
	p *= 1.22;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = vec3(0.06, 0.04, 0.04);
	for(int bi = 0; bi < 3; bi++){
		float fb = float(bi);
		float pn = floor(5.90 + fb * 1.48);
		float aa = an * pn + fb * 0.79 + (time * 0.63) * -0.33 * (1.0 + fb * 0.32);
		float pr = (0.25 + fb * 0.09) * (1.0 + 0.52 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(1.079, 1.887, 2.695) + fb * 0.92 + (time * 0.63) * 0.40);
		float pet = smoothstep(0.039, -0.023, dd);
		pet *= 0.70 + 0.21 * cos(aa);
		col = mix(col, tone, pet * 0.72);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.050, 0.990, 0.927);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

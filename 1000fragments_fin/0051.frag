uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.x += p.y * 0.57;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = vec3(0.02, 0.02, 0.05);
	for(int bi = 0; bi < 5; bi++){
		float fb = float(bi);
		float pn = floor(3.88 + fb * 1.22);
		float aa = an * pn + fb * 0.60 + (time * 0.60) * -0.25 * (1.0 + fb * 0.35);
		float pr = (0.24 + fb * 0.12) * (1.0 + 0.30 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(5.457, 6.737, 8.017) + fb * 0.72 + (time * 0.60) * 0.44);
		float pet = smoothstep(0.035, -0.044, dd);
		pet *= 0.73 + 0.19 * cos(aa);
		col = mix(col, tone, pet * 0.59);
	}
	col = clamp((col - 0.5) * 1.37 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(1.044, 1.011, 0.942);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.y += sin(p.x * 1.53 + (time * 0.62) * 0.45) * 0.19;
	float r = length(p);
	float an = atan(p.y, p.x);
	vec3 col = mix(vec3(0.042, 0.031, 0.079), vec3(0.044, 0.056, 0.106), clamp(0.5 + p.y * -0.55 + p.x * -0.08, 0.0, 1.0));
	for(int bi = 0; bi < 6; bi++){
		float fb = float(bi);
		float pn = floor(5.47 + fb * 1.30);
		float aa = an * pn + fb * 0.95 + (time * 0.62) * -0.34 * (1.0 + fb * 0.18);
		float pr = (0.17 + fb * 0.11) * (1.0 + 0.33 * cos(aa));
		float dd = r - pr;
		vec3 tone = 0.5 + 0.5 * cos(vec3(2.389, 3.938, 5.488) + fb * 0.88 + (time * 0.62) * 0.16);
		float pet = smoothstep(0.030, -0.043, dd);
		pet *= 0.76 + 0.28 * cos(aa);
		col = mix(col, tone, pet * 0.70);
	}
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(1.027, 1.006, 0.915);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.60) * 0.39), cos((time * 0.60) * 0.34)) * 0.20;
	p.y += sin(p.x * 2.67 + (time * 0.60) * 1.03) * 0.14;
	p *= 1.51;
	vec2 z = p;
	vec2 c = vec2(0.19 + 0.12 * sin((time * 0.60) * 1.83), -0.12 + 0.29 * cos((time * 0.60) * 1.43));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.23, 0.17)));
	}
	float v = exp(-trap * 4.58);
	float cc = clamp(0.5 + 0.5 * (v * 3.91), 0.0, 1.0);
	vec3 col = mix(vec3(0.012, 0.110, 0.131), vec3(1.000, 0.776, 0.577), cc);
	col *= 0.82 + 0.17 * sin(gl_FragCoord.y * 1.32 + (time * 0.60) * 8.16);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.38);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(1.018, 0.952, 1.020);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

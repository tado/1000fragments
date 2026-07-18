uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	p.y += sin(p.x * 2.49 + (time * 0.60) * 1.28) * 0.11;
	p *= 1.79;
	vec2 z = p;
	vec2 c = vec2(0.20 + 0.12 * sin((time * 0.60) * 1.29), -0.49 + 0.29 * cos((time * 0.60) * 1.57));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.40);
	vec3 col = vec3(0.5 + 0.5 * (v * 2.33)) * vec3(0.72, 0.62, 0.69) + vec3(0.04, 0.08, 0.05);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.009, 1.003, 0.989);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

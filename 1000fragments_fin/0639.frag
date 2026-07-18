uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	p *= 1.19;
	vec2 z = p;
	vec2 c = vec2(-0.33 + 0.15 * sin((time * 0.85) * 1.35), 0.15 + 0.12 * cos((time * 0.85) * 1.21));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.28);
	vec3 col = vec3(0.471, 0.852, 0.925) * (0.07 / (abs((v * 3.63)) + 0.04));
	col = col / (1.0 + col);
	col *= 0.80 + 0.10 * sin(gl_FragCoord.y * 1.94 + (time * 0.85) * 4.24);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.36);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(0.946, 0.992, 1.051);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

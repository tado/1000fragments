uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p *= 1.06;
	vec2 z = p;
	vec2 c = vec2(0.29 + 0.26 * sin((time * 0.88) * 0.89), -0.22 + 0.05 * cos((time * 0.88) * 0.58));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.50);
	vec3 col = vec3(0.844, 0.956, 0.626) * (0.11 / (abs((v * 1.83)) + 0.05));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.15);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(1.031, 0.985, 0.930);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.58 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.84) * 1.19), cos((time * 0.84) * 0.76)) * 0.11;
	p.x = abs(p.x);
	p *= 1.25;
	vec2 z = p;
	vec2 c = vec2(-0.06 + 0.30 * sin((time * 0.84) * 0.57), -0.17 + 0.10 * cos((time * 0.84) * 0.46));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 1.53);
	vec3 col = vec3(0.71, 0.75, 0.74) * (0.08 / (abs((v * 3.73)) + 0.04));
	col = col / (1.0 + col);
	col *= 0.82 + 0.16 * sin(gl_FragCoord.y * 1.85 + (time * 0.84) * 4.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(1.013, 0.952, 1.016) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

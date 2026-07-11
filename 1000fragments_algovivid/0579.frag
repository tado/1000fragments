uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p *= 1.74;
	vec2 z = p;
	vec2 c = vec2(-0.80 + 0.17 * sin((time * 0.60) * 0.99), 0.16 + 0.09 * cos((time * 0.60) * 0.92));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.17);
	float cc = clamp(0.5 + 0.5 * (v * 2.76), 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.13, 0.31), vec3(0.46, 0.66, 0.52), smoothstep(0.0, 1.0, cc));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col = clamp(col, 0.0, 1.0) * vec3(1.054, 0.977, 0.923) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

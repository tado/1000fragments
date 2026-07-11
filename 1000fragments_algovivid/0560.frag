uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.23;
	p *= 1.21;
	vec2 z = p;
	vec2 c = vec2(-0.33 + 0.06 * sin((time * 0.68) * 1.82), 0.14 + 0.13 * cos((time * 0.68) * 1.39));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.33);
	float cc = clamp(0.5 + 0.5 * (v * 3.03), 0.0, 1.0);
	vec3 col = mix(vec3(0.12, 0.20, 0.15), vec3(0.53, 0.66, 0.66), smoothstep(0.0, 1.0, cc));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.959, 1.001, 0.931) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

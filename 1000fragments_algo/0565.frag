uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.20;
	p *= 1.55;
	vec2 z = p;
	vec2 c = vec2(0.22 + 0.23 * sin((time * 0.77) * 1.44), 0.18 + 0.23 * cos((time * 0.77) * 1.49));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.98);
	float cc = clamp(0.5 + 0.5 * (v * 3.15), 0.0, 1.0);
	vec3 col = mix(vec3(0.60, 0.71, 0.73), vec3(0.07, 0.04, 0.08), cc);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.986, 1.003, 0.981) * 1.00 + 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

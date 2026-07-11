uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p *= 2.12;
	vec2 z = p;
	vec2 c = vec2(-0.70 + 0.24 * sin((time * 0.73) * 0.82), 0.47 + 0.17 * cos((time * 0.73) * 0.55));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 1.55);
	float cc = clamp(0.5 + 0.5 * (v * 2.39), 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.14, 0.08), vec3(0.80, 0.73, 0.73), cc);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col = clamp(col, 0.0, 1.0) * vec3(0.956, 0.993, 0.931) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

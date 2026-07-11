uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.25;
	p *= 1.47;
	vec2 z = p;
	vec2 c = vec2(-0.60 + 0.06 * sin((time * 0.50) * 0.70), -0.21 + 0.19 * cos((time * 0.50) * 1.10));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.93);
	float cc = clamp(0.5 + 0.5 * (v * 2.18), 0.0, 1.0);
	vec3 col = mix(vec3(0.14, 0.08, 0.08), vec3(0.59, 0.60, 0.54), cc);
	col = clamp((col - 0.5) * 1.81 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(0.922, 0.996, 1.028) * 1.00 + 0.010;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

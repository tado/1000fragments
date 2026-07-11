uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p *= 1.87;
	vec2 z = p;
	vec2 c = vec2(-0.88 + 0.15 * sin((time * 0.67) * 1.52), -0.24 + 0.20 * cos((time * 0.67) * 1.08));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.13);
	float cc = clamp(0.5 + 0.5 * (v * 2.00), 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.06, 0.29), vec3(0.58, 0.71, 0.70), smoothstep(0.0, 1.0, cc));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col = clamp(col, 0.0, 1.0) * vec3(0.975, 1.028, 0.924) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

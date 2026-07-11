uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.00;
	vec2 z = p;
	vec2 c = vec2(-0.45 + 0.26 * sin((time * 0.75) * 1.01), -0.34 + 0.06 * cos((time * 0.75) * 1.60));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.10);
	float cc = clamp(0.5 + 0.5 * (v * 3.34), 0.0, 1.0);
	vec3 col = mix(vec3(0.05, 0.05, 0.12), vec3(0.62, 0.72, 0.68), cc);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(0.935, 0.973, 1.027) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

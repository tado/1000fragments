uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	vec2 z = p;
	vec2 c = vec2(0.20 + 0.08 * sin((time * 0.77) * 0.89), 0.19 + 0.10 * cos((time * 0.77) * 0.77));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.03);
	float cc = clamp(0.5 + 0.5 * (v * 2.27), 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.03, 0.10), vec3(0.59, 0.73, 0.75), cc);
	col = clamp((col - 0.5) * 1.57 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.991, 0.949, 1.027) * 1.00 + 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

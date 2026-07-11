uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.92;
	vec2 z = p;
	vec2 c = vec2(-0.82 + 0.29 * sin((time * 0.84) * 1.52), -0.34 + 0.27 * cos((time * 0.84) * 1.16));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.41);
	float cc = clamp(0.5 + 0.5 * (v * 3.94), 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.37, 0.24), vec3(0.43, 0.42, 0.47), smoothstep(0.0, 1.0, cc));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.947, 0.996, 1.051) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

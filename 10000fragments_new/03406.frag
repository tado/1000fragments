uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.66;
	vec2 z = p;
	vec2 c = vec2(0.18 + 0.24 * sin(time * 0.92), 0.50 + 0.17 * cos(time * 1.60));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.01);
	float cc = clamp(0.5 + 0.5 * v * 3.01, 0.0, 1.0);
	vec3 col = mix(vec3(0.27, 0.31, 0.08), vec3(0.98, 0.96, 0.69), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

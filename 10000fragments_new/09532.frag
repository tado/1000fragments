uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	vec2 z = p;
	vec2 c = vec2(-0.54 + 0.14 * sin(time * 1.43), 0.34 + 0.06 * cos(time * 0.75));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.09, 0.30)));
	}
	float v = exp(-trap * 2.74);
	float cc = clamp(0.5 + 0.5 * v * 2.09, 0.0, 1.0);
	vec3 col = mix(vec3(0.31, 0.25, 0.00), vec3(0.62, 0.64, 0.50), cc);
	col = fract(col * 2.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

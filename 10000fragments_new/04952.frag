uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	vec2 z = p;
	vec2 c = vec2(-0.25 + 0.17 * sin(time * 1.72), -0.05 + 0.07 * cos(time * 1.44));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.04, 0.11)));
	}
	float v = exp(-trap * 3.49);
	vec3 col = vec3(0.99, 0.28, 0.92) * (0.22 / (abs(v * 2.73) + 0.09));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.77));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

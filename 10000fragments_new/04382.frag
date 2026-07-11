uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	vec2 z = p;
	vec2 c = vec2(-0.61 + 0.18 * sin(time * 0.59), -0.44 + 0.27 * cos(time * 0.59));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.42);
	vec3 col = vec3(0.56, 0.74, 0.26) * (0.22 / (abs(v * 1.76) + 0.10));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

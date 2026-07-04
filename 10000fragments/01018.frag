uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	vec2 z = p;
	vec2 c = vec2(-0.12 + 0.07 * sin(time * 1.77), 0.39 + 0.26 * cos(time * 1.36));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.30);
	vec3 col = vec3(0.90, 0.25, 0.52) * (0.16 / (abs(v * 1.99) + 0.04));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

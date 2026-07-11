uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.60;
	vec2 z = p;
	vec2 c = vec2(-0.36 + 0.08 * sin(time * 1.55), -0.37 + 0.22 * cos(time * 1.37));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.20);
	vec3 col = vec3(0.5 + 0.5 * v * 2.45) * vec3(1.08, 0.80, 0.58) + vec3(0.01, 0.22, 0.05);
	col = mod(col * 2.96, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

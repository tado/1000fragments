uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.61;
	vec2 z = p;
	vec2 c = vec2(-0.24 + 0.12 * sin(time * 1.07), -0.50 + 0.26 * cos(time * 0.90));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.60);
	vec3 col = vec3(0.5 + 0.5 * v * 3.32) * vec3(0.84, 1.28, 1.12) + vec3(0.21, 0.12, 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

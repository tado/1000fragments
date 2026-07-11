uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	vec2 z = p;
	vec2 c = vec2(-0.88 + 0.17 * sin(time * 1.24), -0.35 + 0.12 * cos(time * 0.64));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.23, -0.49)));
	}
	float v = exp(-trap * 3.98);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.56 * 2.60 + time * 0.74);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

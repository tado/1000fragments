uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.71;
	vec2 z = p;
	vec2 c = vec2(-0.07 + 0.17 * sin(time * 0.82), -0.38 + 0.16 * cos(time * 0.61));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.50, 0.09)));
	}
	float v = exp(-trap * 5.92);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.85 * 2.32 + time * 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

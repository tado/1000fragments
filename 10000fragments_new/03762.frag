uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.40;
	vec2 z = p;
	vec2 c = vec2(-0.13 + 0.19 * sin(time * 1.63), 0.45 + 0.14 * cos(time * 0.89));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.40, -0.49)));
	}
	float v = exp(-trap * 4.54);
	vec3 col = vec3(0.54, 0.99, 0.55) * (0.19 / (abs(v * 1.78) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.98;
	vec2 z = p;
	vec2 c = vec2(-0.15 + 0.14 * sin(time * 0.71), 0.59 + 0.19 * cos(time * 0.72));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.16, -0.27)));
	}
	float v = exp(-trap * 4.79);
	vec3 col = vec3(0.47, 0.35, 0.87) * (0.11 / (abs(v * 1.78) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	vec2 z = p;
	vec2 c = vec2(-0.18 + 0.28 * sin(time * 1.13), -0.06 + 0.18 * cos(time * 1.37));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.44, -0.06)));
	}
	float v = exp(-trap * 3.79);
	vec3 col = vec3(0.32, 0.74, 0.42) * (0.16 / (abs(v * 2.00) + 0.05));
	col = col / (1.0 + col);
	col = fract(col * 2.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

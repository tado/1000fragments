uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.57;
	vec2 z = p;
	vec2 c = vec2(0.07 + 0.23 * sin(time * 0.55), -0.39 + 0.10 * cos(time * 0.73));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.87);
	vec3 col = vec3(0.57, 0.16, 0.97) * (0.18 / (abs(v * 3.38) + 0.04));
	col = col / (1.0 + col);
	col = mod(col * 2.80, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

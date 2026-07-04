uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.40;
	vec2 z = p;
	vec2 c = vec2(-0.03 + 0.16 * sin(time * 0.88), 0.33 + 0.22 * cos(time * 0.54));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 1.56);
	vec3 col = vec3(0.29, 0.34, 0.22) * (0.14 / (abs(v * 3.71) + 0.02));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	vec2 z = p;
	vec2 c = vec2(-0.73 + 0.29 * sin(time * 1.40), -0.26 + 0.11 * cos(time * 0.47));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 1.82);
	vec3 col = vec3(0.35, 0.52, 0.65) * (0.13 / (abs(v * 3.81) + 0.08));
	col = col / (1.0 + col);
	col = mod(col * 1.80, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

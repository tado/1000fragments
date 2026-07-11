uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.15;
	vec2 z = p;
	vec2 c = vec2(-0.81 + 0.11 * sin(time * 1.78), 0.25 + 0.07 * cos(time * 0.85));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.17, 0.06)));
	}
	float v = exp(-trap * 1.77);
	vec3 col = vec3(0.99, 0.19, 0.89) * (0.06 / (abs(v * 3.38) + 0.06));
	col = col / (1.0 + col);
	col = mod(col * 1.52, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

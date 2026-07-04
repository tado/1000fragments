uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	vec2 z = p;
	vec2 c = vec2(-0.75 + 0.27 * sin(time * 1.23), 0.37 + 0.06 * cos(time * 1.31));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.56);
	vec3 col = vec3(0.81, 0.54, 0.20) * (0.17 / (abs(v * 2.80) + 0.04));
	col = col / (1.0 + col);
	col = fract(col * 2.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

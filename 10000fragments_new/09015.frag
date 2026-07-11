uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.03;
	p = rot2(time * -0.91) * p;
	vec2 z = p;
	vec2 c = vec2(-0.39 + 0.07 * sin(time * 1.63), 0.59 + 0.15 * cos(time * 0.61));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.48, -0.04)));
	}
	float v = exp(-trap * 2.41);
	vec3 col = vec3(0.69, 0.87, 0.43) * (0.08 / (abs(v * 3.21) + 0.04));
	col = col / (1.0 + col);
	col = mod(col * 1.62, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

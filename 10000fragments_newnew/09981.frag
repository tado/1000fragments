uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.36;
	p = rot2(time * -0.85) * p;
	vec2 z = p;
	vec2 c = vec2(-0.00 + 0.21 * sin(time * 1.93), -0.03 + 0.07 * cos(time * 1.22));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.07, -0.32)));
	}
	float v = exp(-trap * 2.31);
	vec3 col = vec3(0.28, 0.46, 0.57) * (0.18 / (abs(v * 2.22) + 0.04));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

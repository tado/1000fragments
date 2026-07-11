uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.48;
	p = rot2(time * 1.31) * p;
	vec2 z = p;
	vec2 c = vec2(-0.89 + 0.20 * sin(time * 0.87), -0.10 + 0.06 * cos(time * 0.60));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.25, -0.23)));
	}
	float v = exp(-trap * 1.69);
	vec3 col = vec3(0.72, 0.37, 0.94) * (0.06 / (abs(v * 2.16) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

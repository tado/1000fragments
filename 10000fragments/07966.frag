uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	p = rot2(time * -0.37) * p;
	vec2 z = p;
	vec2 c = vec2(-0.06 + 0.29 * sin(time * 1.75), -0.39 + 0.12 * cos(time * 0.42));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.04, -0.28)));
	}
	float v = exp(-trap * 2.77);
	vec3 col = vec3(0.85, 0.18, 0.68) * (0.07 / (abs(v * 2.94) + 0.04));
	col = col / (1.0 + col);
	col = fract(col * 2.49);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

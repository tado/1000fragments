uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.69;
	p = rot2(time * 1.46) * p;
	vec2 z = p;
	vec2 c = vec2(-0.62 + 0.17 * sin(time * 1.69), -0.26 + 0.22 * cos(time * 0.94));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.36, 0.15)));
	}
	float v = exp(-trap * 4.25);
	vec3 col = vec3(0.29, 0.39, 0.43) * (0.06 / (abs(v * 3.39) + 0.07));
	col = col / (1.0 + col);
	col = fract(col * 1.21);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

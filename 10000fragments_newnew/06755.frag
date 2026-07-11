uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.77;
	p = rot2(time * 1.06) * p;
	vec2 z = p;
	vec2 c = vec2(0.16 + 0.23 * sin(time * 1.04), -0.39 + 0.13 * cos(time * 0.41));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.09, -0.10)));
	}
	float v = exp(-trap * 3.20);
	vec3 col = vec3(0.68, 0.18, 0.85) * (0.10 / (abs(v * 3.89) + 0.02));
	col = col / (1.0 + col);
	col *= 0.80 + 0.18 * sin(gl_FragCoord.y * 2.30 + time * 8.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

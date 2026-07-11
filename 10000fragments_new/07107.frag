uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	p = rot2(time * 0.62) * p;
	vec2 z = p;
	vec2 c = vec2(-0.14 + 0.08 * sin(time * 0.86), -0.33 + 0.12 * cos(time * 0.67));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.54);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.32 * 2.64 + time * 0.36);
	col *= 0.87 + 0.18 * sin(gl_FragCoord.y * 2.33 + time * 17.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

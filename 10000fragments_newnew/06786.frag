uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	p = rot2(time * -0.83) * p;
	vec2 z = p;
	vec2 c = vec2(-0.24 + 0.15 * sin(time * 0.60), -0.41 + 0.25 * cos(time * 0.50));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.87);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.31 * 3.96 + time * 0.47);
	col *= 0.90 + 0.18 * sin(gl_FragCoord.y * 0.90 + time * 15.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

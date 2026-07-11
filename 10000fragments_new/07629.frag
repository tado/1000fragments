uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	p = rot2(time * -0.31) * p;
	vec2 z = p;
	vec2 c = vec2(-0.81 + 0.29 * sin(time * 1.05), 0.58 + 0.30 * cos(time * 0.91));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 5.00);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.99 * 3.45 + time * 0.52);
	col *= 0.83 + 0.17 * sin(gl_FragCoord.y * 2.98 + time * 7.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

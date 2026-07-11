uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.56;
	p = rot2(time * -0.77) * p;
	vec2 z = p;
	vec2 c = vec2(-0.62 + 0.24 * sin(time * 1.01), -0.46 + 0.06 * cos(time * 1.44));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.13);
	vec3 col = vec3(0.97, 0.19, 0.95) * (0.11 / (abs(v * 3.62) + 0.05));
	col = col / (1.0 + col);
	col *= 0.87 + 0.13 * sin(gl_FragCoord.y * 1.71 + time * 15.48);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

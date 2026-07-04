uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	p = rot2(time * 1.08) * p;
	vec2 z = p;
	vec2 c = vec2(-0.30 + 0.28 * sin(time * 1.37), 0.16 + 0.15 * cos(time * 0.58));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.85);
	vec3 col = vec3(0.49, 0.81, 0.42) * (0.09 / (abs(v * 3.31) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

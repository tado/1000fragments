uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	p = rot2(time * -1.05) * p;
	vec2 z = p;
	vec2 c = vec2(-0.80 + 0.20 * sin(time * 1.47), 0.24 + 0.20 * cos(time * 1.50));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.26, -0.16)));
	}
	float v = exp(-trap * 4.08);
	vec3 col = vec3(0.28, 0.26, 0.70) * (0.22 / (abs(v * 2.12) + 0.10));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	p = rot2(time * 1.36) * p;
	vec2 z = p;
	vec2 c = vec2(-0.14 + 0.19 * sin(time * 0.98), -0.19 + 0.10 * cos(time * 1.23));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.95);
	vec3 col = vec3(0.22, 0.73, 0.44) * (0.11 / (abs(v * 2.72) + 0.02));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

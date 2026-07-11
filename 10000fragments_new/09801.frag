uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	p = rot2(time * -1.05) * p;
	vec2 z = p;
	vec2 c = vec2(-0.05 + 0.17 * sin(time * 0.62), -0.39 + 0.17 * cos(time * 1.51));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.28);
	vec3 col = vec3(0.93, 0.21, 0.49) * (0.08 / (abs(v * 3.03) + 0.02));
	col = col / (1.0 + col);
	col = fract(col * 2.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

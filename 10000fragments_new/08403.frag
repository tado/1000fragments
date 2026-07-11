uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	p = rot2(time * -0.70) * p;
	vec2 z = p;
	vec2 c = vec2(-0.62 + 0.17 * sin(time * 1.57), 0.07 + 0.10 * cos(time * 1.25));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.22, -0.11)));
	}
	float v = exp(-trap * 3.04);
	vec3 col = vec3(0.89, 0.63, 0.29) * (0.23 / (abs(v * 3.25) + 0.09));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

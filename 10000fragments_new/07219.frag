uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.31;
	p = rot2(time * 0.87) * p;
	vec2 z = p;
	vec2 c = vec2(-0.35 + 0.22 * sin(time * 1.23), 0.24 + 0.23 * cos(time * 0.66));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.47, -0.23)));
	}
	float v = exp(-trap * 5.36);
	vec3 col = vec3(0.72, 0.78, 0.30) * (0.14 / (abs(v * 1.57) + 0.05));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

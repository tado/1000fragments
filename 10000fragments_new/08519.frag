uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	p = rot2(time * -1.57) * p;
	vec2 z = p;
	vec2 c = vec2(0.08 + 0.28 * sin(time * 1.28), -0.36 + 0.22 * cos(time * 0.82));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.37, 0.23)));
	}
	float v = exp(-trap * 2.45);
	vec3 col = vec3(0.5 + 0.5 * v * 3.20) * vec3(1.12, 0.93, 0.60) + vec3(0.18, 0.12, 0.08);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

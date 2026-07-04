uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.75;
	p = rot2(time * 1.13) * p;
	vec2 z = p;
	vec2 c = vec2(0.13 + 0.11 * sin(time * 0.76), -0.40 + 0.06 * cos(time * 1.40));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.24);
	vec3 col = vec3(0.5 + 0.5 * v * 1.97) * vec3(0.99, 1.18, 1.26) + vec3(0.25, 0.07, 0.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

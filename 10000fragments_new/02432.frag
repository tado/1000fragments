uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.77;
	p = rot2(time * -1.25) * p;
	vec2 z = p;
	vec2 c = vec2(-0.58 + 0.13 * sin(time * 0.92), 0.48 + 0.15 * cos(time * 0.83));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.56);
	vec3 col = vec3(0.5 + 0.5 * v * 3.50) * vec3(1.31, 0.67, 1.48) + vec3(0.25, 0.21, 0.10);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

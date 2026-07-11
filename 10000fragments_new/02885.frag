uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.37;
	p = rot2(time * 1.04) * p;
	vec2 z = p;
	vec2 c = vec2(-0.24 + 0.10 * sin(time * 1.68), -0.10 + 0.20 * cos(time * 0.56));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.00, 0.11)));
	}
	float v = exp(-trap * 1.78);
	vec3 col = vec3(0.5 + 0.5 * v * 3.59) * vec3(1.35, 0.65, 0.95) + vec3(0.22, 0.00, 0.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

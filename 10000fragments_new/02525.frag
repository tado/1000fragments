uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	p = rot2(time * 0.98) * p;
	vec2 z = p;
	vec2 c = vec2(0.02 + 0.12 * sin(time * 0.86), -0.45 + 0.30 * cos(time * 0.79));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.27, -0.02)));
	}
	float v = exp(-trap * 1.60);
	vec3 col = vec3(0.5 + 0.5 * v * 3.74) * vec3(0.97, 1.06, 1.34) + vec3(0.21, 0.05, 0.07);
	col = mod(col * 2.18, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

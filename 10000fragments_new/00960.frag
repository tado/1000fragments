uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.33;
	p = rot2(time * -0.41) * p;
	vec2 z = p;
	vec2 c = vec2(0.11 + 0.24 * sin(time * 0.79), 0.36 + 0.28 * cos(time * 0.62));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.02, 0.32)));
	}
	float v = exp(-trap * 4.57);
	vec3 col = vec3(0.5 + 0.5 * v * 3.23) * vec3(0.81, 1.36, 0.95) + vec3(0.10, 0.10, 0.06);
	col = mod(col * 2.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

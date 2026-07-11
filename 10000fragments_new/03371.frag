uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	p = rot2(time * 0.67) * p;
	vec2 z = p;
	vec2 c = vec2(0.13 + 0.24 * sin(time * 1.60), -0.20 + 0.26 * cos(time * 0.96));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.35);
	vec3 col = vec3(0.5 + 0.5 * v * 1.76) * vec3(1.13, 1.15, 0.59) + vec3(0.19, 0.09, 0.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

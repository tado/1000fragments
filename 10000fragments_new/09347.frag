uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	p = rot2(time * 1.45) * p;
	vec2 z = p;
	vec2 c = vec2(0.18 + 0.14 * sin(time * 1.01), 0.58 + 0.13 * cos(time * 1.51));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.25, -0.39)));
	}
	float v = exp(-trap * 5.78);
	vec3 col = vec3(0.5 + 0.5 * v * 3.08) * vec3(1.27, 0.87, 0.87) + vec3(0.14, 0.25, 0.16);
	col = clamp((col - 0.5) * 1.73 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

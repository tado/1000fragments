uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.30;
	p = rot2(time * -0.41) * p;
	vec2 z = p;
	vec2 c = vec2(0.26 + 0.27 * sin(time * 1.55), -0.60 + 0.16 * cos(time * 0.55));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.15, 0.45)));
	}
	float v = exp(-trap * 1.99);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.77 * 3.86 + time * 0.46);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

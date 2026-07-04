uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.16;
	p = rot2(time * -0.93) * p;
	vec2 z = p;
	vec2 c = vec2(-0.32 + 0.19 * sin(time * 0.54), -0.35 + 0.09 * cos(time * 0.67));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.45, -0.28)));
	}
	float v = exp(-trap * 4.21);
	vec3 col = vec3(0.5 + 0.5 * v * 3.29) * vec3(0.92, 1.21, 1.16) + vec3(0.15, 0.15, 0.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

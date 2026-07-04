uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	p = rot2(time * 0.49) * p;
	vec2 z = p;
	vec2 c = vec2(-0.51 + 0.14 * sin(time * 1.99), -0.37 + 0.24 * cos(time * 1.28));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.90);
	float cc = clamp(0.5 + 0.5 * v * 2.72, 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.39, 0.54), vec3(0.92, 0.98, 0.65), cc);
	col = fract(col * 1.48);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.07;
	p = rot2(time * -0.80) * p;
	vec2 z = p;
	vec2 c = vec2(-0.24 + 0.29 * sin(time * 1.28), 0.50 + 0.26 * cos(time * 1.10));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.20, 0.12)));
	}
	float v = exp(-trap * 4.94);
	float cc = clamp(0.5 + 0.5 * v * 1.78, 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.24, 0.41), vec3(0.73, 0.67, 0.97), cc);
	col = fract(col * 1.58);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

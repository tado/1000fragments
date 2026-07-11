uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	p = rot2(time * 1.42) * p;
	vec2 z = p;
	vec2 c = vec2(-0.50 + 0.23 * sin(time * 1.92), -0.17 + 0.05 * cos(time * 0.65));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.83);
	float cc = clamp(0.5 + 0.5 * v * 1.93, 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.27, 0.45), vec3(0.96, 0.95, 0.93), cc);
	col = fract(col * 1.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

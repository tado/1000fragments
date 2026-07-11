uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	p = rot2(time * 0.86) * p;
	vec2 z = p;
	vec2 c = vec2(-0.19 + 0.14 * sin(time * 1.45), 0.43 + 0.05 * cos(time * 0.47));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.21);
	float cc = clamp(0.5 + 0.5 * v * 4.00, 0.0, 1.0);
	vec3 col = mix(vec3(0.34, 0.28, 0.26), vec3(0.82, 0.74, 0.49), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

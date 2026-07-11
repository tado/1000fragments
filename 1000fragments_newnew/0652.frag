uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.08;
	p = rot2((time * 0.83) * -0.35) * p;
	vec2 z = p;
	vec2 c = vec2(-0.67 + 0.24 * sin((time * 0.83) * 1.16), 0.34 + 0.21 * cos((time * 0.83) * 0.87));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.82);
	float cc = clamp(0.5 + 0.5 * (v * 1.84), 0.0, 1.0);
	vec3 col = mix(vec3(0.12, 0.30, 0.18), vec3(0.68, 0.77, 0.58), smoothstep(0.0, 1.0, cc));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.050, 1.004, 0.939) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	p = rot2(time * -0.92) * p;
	vec2 z = p;
	vec2 c = vec2(-0.85 + 0.21 * sin(time * 1.82), -0.28 + 0.06 * cos(time * 1.45));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 3.25);
	float cc = clamp(0.5 + 0.5 * v * 3.25, 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.16, 0.39), vec3(0.99, 0.86, 0.53), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.84;
	p = rot2(time * -0.49) * p;
	vec2 z = p;
	vec2 c = vec2(-0.36 + 0.23 * sin(time * 1.93), -0.54 + 0.17 * cos(time * 0.61));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.05, -0.48)));
	}
	float v = exp(-trap * 3.44);
	float cc = clamp(0.5 + 0.5 * v * 2.55, 0.0, 1.0);
	vec3 col = mix(vec3(0.25, 0.20, 0.05), vec3(0.82, 0.77, 0.55), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

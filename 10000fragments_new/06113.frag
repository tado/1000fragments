uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	p = rot2(time * 1.32) * p;
	vec2 z = p;
	vec2 c = vec2(-0.80 + 0.13 * sin(time * 1.78), 0.23 + 0.28 * cos(time * 0.87));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.41, 0.22)));
	}
	float v = exp(-trap * 2.92);
	float cc = clamp(0.5 + 0.5 * v * 1.94, 0.0, 1.0);
	vec3 col = mix(vec3(0.05, 0.02, 0.32), vec3(0.79, 0.88, 0.60), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

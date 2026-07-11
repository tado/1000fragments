uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.38;
	p = rot2(time * 0.75) * p;
	vec2 z = p;
	vec2 c = vec2(0.12 + 0.17 * sin(time * 1.82), -0.25 + 0.29 * cos(time * 1.55));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.37);
	float cc = clamp(0.5 + 0.5 * v * 2.25, 0.0, 1.0);
	vec3 col = mix(vec3(0.23, 0.10, 0.20), vec3(0.56, 0.65, 0.93), cc);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

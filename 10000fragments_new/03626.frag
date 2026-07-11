uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.01;
	p = rot2(time * 0.60) * p;
	vec2 z = p;
	vec2 c = vec2(-0.64 + 0.09 * sin(time * 1.25), -0.32 + 0.05 * cos(time * 1.43));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.43);
	float cc = clamp(0.5 + 0.5 * v * 2.96, 0.0, 1.0);
	vec3 col = mix(vec3(0.28, 0.03, 0.36), vec3(0.88, 0.99, 0.66), cc);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

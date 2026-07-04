uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	p = rot2(time * 1.00) * p;
	vec2 z = p;
	vec2 c = vec2(-0.48 + 0.08 * sin(time * 0.87), -0.59 + 0.13 * cos(time * 0.55));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.12);
	float cc = clamp(0.5 + 0.5 * v * 2.74, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.22, 0.47), vec3(0.70, 0.77, 0.97), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

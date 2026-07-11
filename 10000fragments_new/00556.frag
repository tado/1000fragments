uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	p = rot2(time * -0.68) * p;
	vec2 z = p;
	vec2 c = vec2(-0.04 + 0.24 * sin(time * 1.77), -0.10 + 0.15 * cos(time * 1.55));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.21, -0.37)));
	}
	float v = exp(-trap * 4.56);
	float cc = clamp(0.5 + 0.5 * v * 2.10, 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.15, 0.31), vec3(0.81, 0.95, 0.72), cc);
	col = clamp((col - 0.5) * 2.12 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

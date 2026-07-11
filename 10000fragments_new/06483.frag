uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.12;
	p = rot2(time * -0.42) * p;
	vec2 z = p;
	vec2 c = vec2(-0.39 + 0.06 * sin(time * 0.83), -0.59 + 0.28 * cos(time * 1.59));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.33, -0.25)));
	}
	float v = exp(-trap * 3.40);
	float cc = clamp(0.5 + 0.5 * v * 2.31, 0.0, 1.0);
	vec3 col = mix(vec3(0.32, 0.36, 0.03), vec3(0.58, 0.81, 0.44), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.68;
	p = rot2(time * -1.12) * p;
	vec2 z = p;
	vec2 c = vec2(-0.84 + 0.23 * sin(time * 1.33), -0.29 + 0.11 * cos(time * 0.89));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.06, 0.42)));
	}
	float v = exp(-trap * 3.30);
	float cc = clamp(0.5 + 0.5 * v * 1.73, 0.0, 1.0);
	vec3 col = mix(vec3(0.30, 0.04, 0.33), vec3(0.97, 0.81, 0.78), cc);
	col *= 0.90 + 0.14 * sin(gl_FragCoord.y * 1.59 + time * 6.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

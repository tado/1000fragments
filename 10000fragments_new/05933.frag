uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	p = rot2(time * 0.87) * p;
	vec2 z = p;
	vec2 c = vec2(-0.45 + 0.16 * sin(time * 0.73), 0.16 + 0.08 * cos(time * 1.53));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.22);
	float cc = clamp(0.5 + 0.5 * v * 1.84, 0.0, 1.0);
	vec3 col = mix(vec3(0.28, 0.28, 0.16), vec3(0.98, 0.57, 0.92), cc);
	col = fract(col * 1.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	p = rot2(time * -0.59) * p;
	vec2 z = p;
	vec2 c = vec2(-0.49 + 0.28 * sin(time * 1.38), -0.20 + 0.22 * cos(time * 1.13));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.73);
	vec3 col = vec3(0.5 + 0.5 * v * 1.87) * vec3(1.13, 0.83, 0.77) + vec3(0.07, 0.06, 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

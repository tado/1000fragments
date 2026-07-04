uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	p = rot2(time * -0.41) * p;
	vec2 z = p;
	vec2 c = vec2(-0.02 + 0.11 * sin(time * 1.53), -0.04 + 0.15 * cos(time * 0.75));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.69);
	vec3 col = vec3(0.5 + 0.5 * v * 2.01) * vec3(1.20, 1.11, 1.20) + vec3(0.04, 0.21, 0.02);
	col *= 0.81 + 0.17 * sin(gl_FragCoord.y * 1.83 + time * 9.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

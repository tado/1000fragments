uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	p = rot2(time * -1.51) * p;
	vec2 z = p;
	vec2 c = vec2(-0.61 + 0.08 * sin(time * 0.70), 0.16 + 0.27 * cos(time * 1.46));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.40, 0.18)));
	}
	float v = exp(-trap * 4.49);
	vec3 col = vec3(0.5 + 0.5 * v * 2.41) * vec3(1.48, 1.00, 0.95) + vec3(0.04, 0.02, 0.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	p = rot2(time * 0.99) * p;
	vec2 z = p;
	vec2 c = vec2(-0.35 + 0.09 * sin(time * 1.24), -0.08 + 0.22 * cos(time * 0.43));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.35, 0.10)));
	}
	float v = exp(-trap * 2.73);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.53 * 4.21 + time * 0.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

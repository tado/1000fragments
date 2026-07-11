uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.68;
	p = rot2(time * -0.48) * p;
	vec2 z = p;
	vec2 c = vec2(0.17 + 0.17 * sin(time * 1.83), 0.40 + 0.10 * cos(time * 1.04));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.37, 0.19)));
	}
	float v = exp(-trap * 3.31);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.11 * 4.13 + time * 0.51);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

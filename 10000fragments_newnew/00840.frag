uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	p = rot2(time * 1.16) * p;
	vec2 z = p;
	vec2 c = vec2(0.08 + 0.18 * sin(time * 1.00), -0.09 + 0.18 * cos(time * 0.41));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.50);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.56 * 4.06 + time * 0.04);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

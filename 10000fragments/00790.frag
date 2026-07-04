uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.85;
	p = rot2(time * -1.53) * p;
	vec2 z = p;
	vec2 c = vec2(-0.08 + 0.28 * sin(time * 0.80), 0.38 + 0.19 * cos(time * 0.69));
	float trap = 10.0;
	for(int oi = 0; oi < 18; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 1.53);
	vec3 col = vec3(0.81, 0.46, 0.70) * (0.20 / (abs(v * 3.20) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

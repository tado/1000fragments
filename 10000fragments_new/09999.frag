uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	p = rot2(time * -0.60) * p;
	vec2 z = p;
	vec2 c = vec2(-0.61 + 0.20 * sin(time * 1.95), 0.14 + 0.24 * cos(time * 0.65));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 3.57);
	vec3 col = vec3(0.23, 0.62, 0.96) * (0.20 / (abs(v * 1.56) + 0.08));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.55 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

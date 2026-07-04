uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	p = rot2(time * -0.40) * p;
	vec2 z = p;
	vec2 c = vec2(-0.44 + 0.15 * sin(time * 0.55), 0.31 + 0.29 * cos(time * 0.92));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.74);
	vec3 col = vec3(0.28, 0.96, 0.25) * (0.15 / (abs(v * 1.77) + 0.02));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.51;
	p = rot2(time * -1.27) * p;
	vec2 z = p;
	vec2 c = vec2(-0.45 + 0.28 * sin(time * 1.84), -0.55 + 0.26 * cos(time * 0.56));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.36, -0.42)));
	}
	float v = exp(-trap * 4.46);
	vec3 col = vec3(0.51, 0.56, 0.83) * (0.16 / (abs(v * 2.25) + 0.05));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

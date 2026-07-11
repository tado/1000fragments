uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	p = rot2(time * -0.38) * p;
	vec2 z = p;
	vec2 c = vec2(-0.79 + 0.23 * sin(time * 0.75), -0.23 + 0.30 * cos(time * 1.22));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.20, 0.10)));
	}
	float v = exp(-trap * 3.48);
	vec3 col = vec3(0.26, 0.39, 0.92) * (0.11 / (abs(v * 2.23) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

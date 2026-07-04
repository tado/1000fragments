uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.44;
	p = rot2(time * 1.12) * p;
	vec2 z = p;
	vec2 c = vec2(-0.73 + 0.15 * sin(time * 1.20), 0.32 + 0.26 * cos(time * 0.96));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.23, 0.41)));
	}
	float v = exp(-trap * 1.63);
	vec3 col = vec3(0.58, 0.35, 0.61) * (0.15 / (abs(v * 3.12) + 0.08));
	col = col / (1.0 + col);
	col = fract(col * 1.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	p = rot2(time * 1.49) * p;
	vec2 z = p;
	vec2 c = vec2(-0.68 + 0.06 * sin(time * 1.86), 0.16 + 0.18 * cos(time * 0.45));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.20, -0.29)));
	}
	float v = exp(-trap * 4.63);
	vec3 col = vec3(0.65, 0.39, 0.32) * (0.16 / (abs(v * 3.25) + 0.04));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.82 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

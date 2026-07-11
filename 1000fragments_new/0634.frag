uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.71;
	p = rot2(time * -1.48) * p;
	vec2 z = p;
	vec2 c = vec2(-0.37 + 0.29 * sin(time * 1.48), 0.12 + 0.10 * cos(time * 1.38));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.40, -0.49)));
	}
	float v = exp(-trap * 4.80);
	vec3 col = vec3(0.49, 0.71, 0.47) * (0.19 / (abs(v * 1.88) + 0.02));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

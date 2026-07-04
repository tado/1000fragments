uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.11;
	p = rot2(time * 1.39) * p;
	vec2 z = p;
	vec2 c = vec2(-0.67 + 0.23 * sin(time * 1.83), -0.33 + 0.23 * cos(time * 1.27));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.05);
	vec3 col = vec3(0.42, 0.39, 0.58) * (0.08 / (abs(v * 3.71) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

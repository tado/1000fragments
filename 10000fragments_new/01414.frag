uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	p = rot2(time * 1.16) * p;
	vec2 z = p;
	vec2 c = vec2(-0.22 + 0.12 * sin(time * 0.74), -0.45 + 0.12 * cos(time * 1.24));
	float trap = 10.0;
	for(int oi = 0; oi < 22; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.29, 0.43)));
	}
	float v = exp(-trap * 5.75);
	vec3 col = vec3(0.68, 0.31, 0.82) * (0.07 / (abs(v * 2.03) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

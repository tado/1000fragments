uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	p = rot2(time * 0.52) * p;
	vec2 z = p;
	vec2 c = vec2(0.06 + 0.09 * sin(time * 0.66), -0.54 + 0.27 * cos(time * 1.11));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.81);
	vec3 col = vec3(0.5 + 0.5 * v * 3.61) * vec3(1.44, 0.85, 1.14) + vec3(0.00, 0.24, 0.17);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

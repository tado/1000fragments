uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	p = rot2(time * 0.57) * p;
	vec2 z = p;
	vec2 c = vec2(-0.21 + 0.23 * sin(time * 0.91), 0.48 + 0.19 * cos(time * 0.47));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.01);
	vec3 col = vec3(0.5 + 0.5 * v * 1.52) * vec3(1.49, 1.23, 1.50) + vec3(0.17, 0.23, 0.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

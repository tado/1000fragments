uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.04;
	p = rot2(time * 1.07) * p;
	vec2 z = p;
	vec2 c = vec2(-0.88 + 0.09 * sin(time * 1.95), -0.12 + 0.12 * cos(time * 0.58));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.16, 0.36)));
	}
	float v = exp(-trap * 5.82);
	vec3 col = vec3(0.5 + 0.5 * v * 4.00) * vec3(0.76, 1.21, 0.94) + vec3(0.24, 0.05, 0.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

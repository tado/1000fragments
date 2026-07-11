uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	p = rot2(time * 0.85) * p;
	vec2 z = p;
	vec2 c = vec2(-0.48 + 0.16 * sin(time * 1.81), -0.29 + 0.24 * cos(time * 1.17));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.04, 0.37)));
	}
	float v = exp(-trap * 3.07);
	vec3 col = vec3(0.5 + 0.5 * v * 2.88) * vec3(0.82, 0.52, 1.47) + vec3(0.09, 0.19, 0.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

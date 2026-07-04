uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.06;
	p = rot2(time * 0.40) * p;
	vec2 z = p;
	vec2 c = vec2(-0.82 + 0.13 * sin(time * 1.46), -0.33 + 0.18 * cos(time * 1.05));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.38);
	vec3 col = vec3(0.5 + 0.5 * v * 2.59) * vec3(1.27, 0.80, 1.35) + vec3(0.01, 0.09, 0.09);
	col = fract(col * 1.53);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

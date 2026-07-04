uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.89;
	p = rot2(time * 1.22) * p;
	vec2 z = p;
	vec2 c = vec2(-0.60 + 0.25 * sin(time * 1.99), -0.49 + 0.12 * cos(time * 1.50));
	float trap = 10.0;
	for(int oi = 0; oi < 14; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.11);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.57 * 1.53 + time * 0.03);
	col *= 0.81 + 0.19 * sin(gl_FragCoord.y * 2.15 + time * 14.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

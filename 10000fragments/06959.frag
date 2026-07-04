uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.50;
	p = rot2(time * -1.24) * p;
	vec2 z = p;
	vec2 c = vec2(-0.77 + 0.05 * sin(time * 1.25), -0.16 + 0.07 * cos(time * 1.16));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.47);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.49 * 3.28 + time * 0.21);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.81 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	p = rot2(time * -1.36) * p;
	vec2 z = p;
	vec2 c = vec2(0.21 + 0.26 * sin(time * 1.72), -0.46 + 0.12 * cos(time * 1.19));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 3.35);
	float cc = clamp(0.5 + 0.5 * v * 2.31, 0.0, 1.0);
	vec3 col = mix(vec3(0.00, 0.26, 0.00), vec3(0.93, 0.92, 0.69), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.57 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

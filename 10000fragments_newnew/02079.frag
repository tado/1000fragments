uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	p = rot2(time * -0.32) * p;
	vec2 z = p;
	vec2 c = vec2(-0.58 + 0.23 * sin(time * 1.69), 0.31 + 0.26 * cos(time * 0.49));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.67);
	float cc = clamp(0.5 + 0.5 * v * 2.92, 0.0, 1.0);
	vec3 col = mix(vec3(0.15, 0.22, 0.32), vec3(0.57, 0.74, 0.58), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.68 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

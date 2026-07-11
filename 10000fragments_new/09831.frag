uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.92;
	p = rot2(time * -1.03) * p;
	vec2 z = p;
	vec2 c = vec2(-0.18 + 0.07 * sin(time * 1.73), 0.43 + 0.30 * cos(time * 0.69));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.25, -0.09)));
	}
	float v = exp(-trap * 3.65);
	float cc = clamp(0.5 + 0.5 * v * 2.99, 0.0, 1.0);
	vec3 col = mix(vec3(0.22, 0.09, 0.42), vec3(0.80, 0.59, 0.43), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.98 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

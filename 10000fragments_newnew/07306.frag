uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	p = rot2(time * 1.38) * p;
	vec2 z = p;
	vec2 c = vec2(-0.15 + 0.09 * sin(time * 1.43), 0.34 + 0.23 * cos(time * 1.08));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 4.44);
	float cc = clamp(0.5 + 0.5 * v * 2.04, 0.0, 1.0);
	vec3 col = mix(vec3(0.28, 0.07, 0.04), vec3(0.78, 0.76, 0.91), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.17 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.10;
	p = rot2(time * 1.33) * p;
	vec2 z = p;
	vec2 c = vec2(-0.37 + 0.15 * sin(time * 1.42), -0.48 + 0.13 * cos(time * 0.73));
	float trap = 10.0;
	for(int oi = 0; oi < 8; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 1.80);
	float cc = clamp(0.5 + 0.5 * v * 2.95, 0.0, 1.0);
	vec3 col = mix(vec3(0.10, 0.27, 0.44), vec3(0.77, 0.72, 0.86), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.23 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

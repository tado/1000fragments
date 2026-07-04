uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.11;
	p = rot2(time * -0.41) * p;
	vec2 z = p;
	vec2 c = vec2(-0.30 + 0.22 * sin(time * 1.45), 0.43 + 0.14 * cos(time * 1.39));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.87);
	float cc = clamp(0.5 + 0.5 * v * 2.14, 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.12, 0.13), vec3(0.64, 0.77, 0.86), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.89 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.94;
	p = rot2(time * -0.84) * p;
	vec2 z = p;
	vec2 c = vec2(-0.31 + 0.18 * sin(time * 1.13), 0.46 + 0.21 * cos(time * 1.14));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.52);
	float cc = clamp(0.5 + 0.5 * v * 1.62, 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.25, 0.33), vec3(1.00, 0.57, 0.80), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.84 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

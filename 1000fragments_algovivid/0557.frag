uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	p = rot2((time * 0.54) * 1.02) * p;
	vec2 z = p;
	vec2 c = vec2(0.12 + 0.06 * sin((time * 0.54) * 0.67), -0.18 + 0.10 * cos((time * 0.54) * 0.60));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.25);
	float cc = clamp(0.5 + 0.5 * (v * 3.39), 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.13, 0.05), vec3(0.69, 0.69, 0.53), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.41 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col = clamp(col, 0.0, 1.0) * vec3(0.995, 0.997, 1.009) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

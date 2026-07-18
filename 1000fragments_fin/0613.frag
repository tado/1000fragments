uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 2.09;
	p = rot2((time * 0.75) * 0.42) * p;
	vec2 z = p;
	vec2 c = vec2(-0.41 + 0.10 * sin((time * 0.75) * 1.89), -0.46 + 0.24 * cos((time * 0.75) * 0.98));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.46);
	vec3 col = vec3(0.197, 0.205, 0.497) * (0.08 / (abs((v * 2.19)) + 0.07));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.89 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(1.028, 0.972, 0.945);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p *= 1.91;
	p = rot2((time * 0.58) * 0.77) * p;
	vec2 z = p;
	vec2 c = vec2(-0.55 + 0.10 * sin((time * 0.58) * 0.50), -0.58 + 0.16 * cos((time * 0.58) * 0.84));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.11);
	vec3 col = vec3(0.982, 0.464, 0.431) * (0.10 / (abs((v * 1.88)) + 0.10));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.72 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.14);
	col *= vec3(0.987, 1.011, 1.013);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

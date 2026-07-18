uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.x += p.y * -0.57;
	p *= 1.20;
	p = rot2((time * 0.60) * 0.69) * p;
	vec2 z = p;
	vec2 c = vec2(0.08 + 0.13 * sin((time * 0.60) * 1.99), -0.35 + 0.20 * cos((time * 0.60) * 0.58));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 4.91);
	vec3 col = vec3(1.000, 0.771, 0.556) * (0.11 / (abs((v * 1.59)) + 0.03));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.50 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.040, 0.991, 0.919);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

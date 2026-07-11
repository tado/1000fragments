uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.49;
	p = rot2((time * 0.57) * 0.82) * p;
	vec2 z = p;
	vec2 c = vec2(-0.76 + 0.13 * sin((time * 0.57) * 1.96), 0.57 + 0.15 * cos((time * 0.57) * 0.74));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.08);
	vec3 col = vec3(0.42, 0.44, 0.47) * (0.10 / (abs((v * 2.59)) + 0.03));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.01 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col = clamp(col, 0.0, 1.0) * vec3(0.927, 0.975, 1.025) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

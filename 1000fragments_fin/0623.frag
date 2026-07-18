uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.20;
	vec2 z = p;
	vec2 c = vec2(0.23 + 0.06 * sin((time * 0.59) * 1.27), 0.49 + 0.15 * cos((time * 0.59) * 0.80));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 3.99);
	vec3 col = vec3(0.824, 0.960, 0.895) * (0.08 / (abs((v * 2.37)) + 0.09));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(1.005, 0.970, 1.019);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

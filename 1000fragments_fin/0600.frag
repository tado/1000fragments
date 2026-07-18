uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.52;
	p.y += sin(p.x * 1.47 + (time * 0.87) * 0.75) * 0.13;
	p *= 1.49;
	vec2 z = p;
	vec2 c = vec2(-0.64 + 0.21 * sin((time * 0.87) * 1.97), -0.21 + 0.23 * cos((time * 0.87) * 1.43));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 1.80);
	vec3 col = vec3(0.5 + 0.5 * (v * 1.98)) * vec3(0.58, 0.57, 0.52) + vec3(0.07, 0.03, 0.08);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.15));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.039, 1.011, 0.934);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.58 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

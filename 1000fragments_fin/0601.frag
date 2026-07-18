uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.46 + (time * 0.87) * 1.27) * 0.14;
	p += vec2(sin((time * 0.87) * 1.03), cos((time * 0.87) * 0.76)) * 0.06;
	p *= 1.09;
	vec2 z = p;
	vec2 c = vec2(-0.81 + 0.29 * sin((time * 0.87) * 1.76), -0.25 + 0.06 * cos((time * 0.87) * 0.56));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 1.62);
	vec3 col = vec3(0.5 + 0.5 * (v * 2.08)) * vec3(0.52, 0.43, 0.48) + vec3(0.08, 0.10, 0.07);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.61));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(0.974, 1.017, 0.942);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

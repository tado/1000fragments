uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.21;
	vec2 z = p;
	vec2 c = vec2(-0.33 + 0.17 * sin((time * 0.75) * 1.47), -0.47 + 0.18 * cos((time * 0.75) * 0.91));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.86);
	float cc = clamp(0.5 + 0.5 * (v * 3.31), 0.0, 1.0);
	vec3 col = mix(vec3(0.017, 0.112, 0.153), vec3(1.000, 0.778, 0.550), cc);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.55);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(1.027, 1.013, 0.937);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

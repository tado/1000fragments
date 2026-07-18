uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	p *= 1.87;
	vec2 z = p;
	vec2 c = vec2(-0.61 + 0.23 * sin((time * 0.62) * 0.97), -0.42 + 0.17 * cos((time * 0.62) * 1.40));
	float trap = 10.0;
	for(int oi = 0; oi < 16; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.97);
	vec3 col = vec3(0.5 + 0.5 * (v * 1.62)) * vec3(0.64, 0.61, 0.71) + vec3(0.08, 0.11, 0.05);
	col = clamp((col - 0.5) * 2.00 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(0.938, 0.983, 1.031);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

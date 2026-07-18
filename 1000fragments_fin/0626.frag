uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	vec2 z = p;
	vec2 c = vec2(-0.26 + 0.12 * sin((time * 0.62) * 1.55), 0.21 + 0.07 * cos((time * 0.62) * 1.24));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 2.61);
	float cc = clamp(0.5 + 0.5 * (v * 2.63), 0.0, 1.0);
	vec3 col = mix(vec3(0.036, 0.108, 0.126), vec3(1.000, 0.784, 0.557), cc);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(0.921, 0.972, 1.058);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

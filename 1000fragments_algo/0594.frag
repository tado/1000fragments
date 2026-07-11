uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.x = abs(p.x) - 0.34;
	p *= 1.96;
	vec2 z = p;
	vec2 c = vec2(-0.59 + 0.06 * sin((time * 0.70) * 1.14), -0.22 + 0.27 * cos((time * 0.70) * 1.56));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.22, 0.23)));
	}
	float v = exp(-trap * 2.34);
	float cc = clamp(0.5 + 0.5 * (v * 3.92), 0.0, 1.0);
	vec3 col = mix(vec3(0.00, 0.00, 0.00), vec3(0.64, 0.64, 0.55), cc);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(1.018, 0.947, 0.998) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

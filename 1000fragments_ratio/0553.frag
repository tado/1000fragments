uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.56;
	p.y += sin(p.x * 2.24 + (time * 0.72) * 0.42) * 0.09;
	p *= 1.96;
	vec2 z = p;
	vec2 c = vec2(-0.20 + 0.06 * sin((time * 0.72) * 0.57), -0.22 + 0.23 * cos((time * 0.72) * 0.87));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.45);
	float cc = clamp(0.5 + 0.5 * (v * 3.36), 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.04, 0.13), vec3(0.69, 0.71, 0.74), cc);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.961, 0.991, 0.928) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

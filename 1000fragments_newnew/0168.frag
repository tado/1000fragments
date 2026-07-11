uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.51;
	vec2 z = p;
	vec2 c = vec2(-0.83 + 0.09 * sin((time * 0.77) * 1.31), 0.05 + 0.07 * cos((time * 0.77) * 0.74));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.05, 0.10)));
	}
	float v = exp(-trap * 4.19);
	vec3 col = vec3(0.49, 0.44, 0.38) * (0.10 / (abs((v * 2.04)) + 0.04));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(1.054, 1.009, 0.946) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

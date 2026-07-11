uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.16;
	vec2 z = p;
	vec2 c = vec2(0.21 + 0.08 * sin((time * 0.57) * 1.33), -0.31 + 0.25 * cos((time * 0.57) * 0.60));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.96);
	float cc = clamp(0.5 + 0.5 * (v * 3.48), 0.0, 1.0);
	vec3 col = mix(vec3(0.56, 0.58, 0.57), vec3(0.16, 0.09, 0.17), cc);
	col *= 0.88 + 0.12 * sin(gl_FragCoord.y * 1.20 + (time * 0.57) * 8.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(0.969, 1.020, 0.925) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

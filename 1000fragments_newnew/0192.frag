uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	p = rot2((time * 0.59) * -0.58) * p;
	vec2 z = p;
	vec2 c = vec2(0.14 + 0.28 * sin((time * 0.59) * 1.87), -0.35 + 0.14 * cos((time * 0.59) * 1.38));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.01, -0.18)));
	}
	float v = exp(-trap * 3.05);
	float cc = clamp(0.5 + 0.5 * (v * 2.58), 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.07, 0.04), vec3(0.75, 0.67, 0.77), cc);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(0.993, 0.968, 1.025) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

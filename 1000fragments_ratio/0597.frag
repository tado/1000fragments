uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.61;
	p = rot2((time * 0.55) * -0.56) * p;
	vec2 z = p;
	vec2 c = vec2(-0.73 + 0.16 * sin((time * 0.55) * 1.58), -0.42 + 0.24 * cos((time * 0.55) * 1.57));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.24);
	float cc = clamp(0.5 + 0.5 * (v * 1.73), 0.0, 1.0);
	vec3 col = mix(vec3(0.16, 0.16, 0.17), vec3(0.61, 0.67, 0.71), cc);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(1.009, 1.000, 0.988) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

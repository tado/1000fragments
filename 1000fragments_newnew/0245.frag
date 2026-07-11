uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	p = rot2((time * 0.57) * 0.40) * p;
	vec2 z = p;
	vec2 c = vec2(-0.25 + 0.28 * sin((time * 0.57) * 1.18), -0.31 + 0.17 * cos((time * 0.57) * 0.67));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.77);
	float cc = clamp(0.5 + 0.5 * (v * 2.69), 0.0, 1.0);
	vec3 col = mix(vec3(0.78, 0.69, 0.79), vec3(0.12, 0.06, 0.06), cc);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(0.941, 0.964, 1.026) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

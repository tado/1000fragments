uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	p = rot2((time * 0.61) * 1.05) * p;
	vec2 z = p;
	vec2 c = vec2(-0.05 + 0.16 * sin((time * 0.61) * 1.41), -0.36 + 0.12 * cos((time * 0.61) * 0.57));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 4.56);
	float cc = clamp(0.5 + 0.5 * (v * 3.10), 0.0, 1.0);
	vec3 col = mix(vec3(0.31, 0.30, 0.28), vec3(0.76, 0.79, 0.60), smoothstep(0.0, 1.0, cc));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.37);
	col = clamp(col, 0.0, 1.0) * vec3(1.044, 0.992, 0.946) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

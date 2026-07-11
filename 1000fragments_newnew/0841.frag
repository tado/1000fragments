uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.56;
	p = rot2((time * 0.77) * -0.45) * p;
	vec2 z = p;
	vec2 c = vec2(0.10 + 0.15 * sin((time * 0.77) * 1.61), -0.45 + 0.22 * cos((time * 0.77) * 0.65));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.59);
	vec3 col = vec3(0.5 + 0.5 * (v * 1.59)) * vec3(0.58, 0.48, 0.52) + vec3(0.09, 0.10, 0.10);
	col *= 0.87 + 0.13 * sin(gl_FragCoord.y * 2.35 + (time * 0.77) * 16.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(0.919, 1.000, 1.046) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

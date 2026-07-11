uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.73;
	p = rot2((time * 0.77) * 1.55) * p;
	vec2 z = p;
	vec2 c = vec2(0.29 + 0.15 * sin((time * 0.77) * 1.61), -0.25 + 0.09 * cos((time * 0.77) * 0.83));
	float trap = 10.0;
	for(int oi = 0; oi < 10; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 5.86);
	float cc = clamp(0.5 + 0.5 * (v * 1.77), 0.0, 1.0);
	vec3 col = mix(vec3(0.27, 0.16, 0.18), vec3(0.62, 0.49, 0.53), smoothstep(0.0, 1.0, cc));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.00 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(1.028, 0.988, 0.916) * 1.00 + 0.010;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

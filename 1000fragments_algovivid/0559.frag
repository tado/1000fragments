uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.52;
	p = rot2((time * 0.66) * 1.43) * p;
	vec2 z = p;
	vec2 c = vec2(-0.25 + 0.24 * sin((time * 0.66) * 0.69), -0.50 + 0.16 * cos((time * 0.66) * 1.55));
	float trap = 10.0;
	for(int oi = 0; oi < 12; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, min(abs(z.x), abs(z.y)));
	}
	float v = exp(-trap * 5.40);
	float cc = clamp(0.5 + 0.5 * (v * 3.38), 0.0, 1.0);
	vec3 col = mix(vec3(0.23, 0.03, 0.26), vec3(0.60, 0.51, 0.55), smoothstep(0.0, 1.0, cc));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.78 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col = clamp(col, 0.0, 1.0) * vec3(1.011, 1.009, 0.984) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

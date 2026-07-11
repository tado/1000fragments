uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.57) * 1.05), cos((time * 0.57) * 0.33)) * 0.17;
	p *= 1.59;
	p = rot2((time * 0.57) * -0.41) * p;
	vec2 z = p;
	vec2 c = vec2(0.12 + 0.05 * sin((time * 0.57) * 1.26), 0.29 + 0.17 * cos((time * 0.57) * 0.82));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.39, -0.10)));
	}
	float v = exp(-trap * 2.49);
	float cc = clamp(0.5 + 0.5 * (v * 1.77), 0.0, 1.0);
	vec3 col = mix(vec3(0.11, 0.05, 0.09), vec3(0.61, 0.67, 0.75), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.07 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.65);
	col = clamp(col, 0.0, 1.0) * vec3(1.023, 0.964, 1.027) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

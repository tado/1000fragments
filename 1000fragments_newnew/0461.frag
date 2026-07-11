uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.76;
	p = rot2((time * 0.58) * 0.89) * p;
	vec2 z = p;
	vec2 c = vec2(-0.23 + 0.09 * sin((time * 0.58) * 1.43), -0.15 + 0.20 * cos((time * 0.58) * 0.98));
	float trap = 10.0;
	for(int oi = 0; oi < 13; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 1.59);
	float cc = clamp(0.5 + 0.5 * (v * 2.73), 0.0, 1.0);
	vec3 col = mix(vec3(0.18, 0.11, 0.19), vec3(0.73, 0.71, 0.66), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.44 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(0.979, 1.000, 0.945) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

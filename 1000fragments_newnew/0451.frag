uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.87;
	p = rot2((time * 0.57) * 0.81) * p;
	vec2 z = p;
	vec2 c = vec2(-0.29 + 0.28 * sin((time * 0.57) * 0.87), 0.51 + 0.14 * cos((time * 0.57) * 1.57));
	float trap = 10.0;
	for(int oi = 0; oi < 17; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.53);
	float cc = clamp(0.5 + 0.5 * (v * 2.84), 0.0, 1.0);
	vec3 col = mix(vec3(0.39, 0.29, 0.26), vec3(0.42, 0.55, 0.49), smoothstep(0.0, 1.0, cc));
	col = clamp((col - 0.5) * 1.88 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.36);
	col = clamp(col, 0.0, 1.0) * vec3(1.010, 0.941, 1.020) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

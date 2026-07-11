uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	p = rot2((time * 0.55) * -1.47) * p;
	vec2 z = p;
	vec2 c = vec2(-0.50 + 0.29 * sin((time * 0.55) * 0.61), 0.35 + 0.15 * cos((time * 0.55) * 0.86));
	float trap = 10.0;
	for(int oi = 0; oi < 15; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.74);
	vec3 col = vec3(0.5 + 0.5 * (v * 3.08)) * vec3(0.52, 0.48, 0.47) + vec3(0.06, 0.00, 0.02);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(0.993, 0.950, 1.018) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	p = rot2((time * 0.76) * 0.38) * p;
	vec2 z = p;
	vec2 c = vec2(-0.53 + 0.20 * sin((time * 0.76) * 1.35), -0.06 + 0.28 * cos((time * 0.76) * 1.09));
	float trap = 10.0;
	for(int oi = 0; oi < 24; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.37, 0.50)));
	}
	float v = exp(-trap * 2.99);
	float cc = clamp(0.5 + 0.5 * (v * 3.78), 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.02, 0.09), vec3(0.74, 0.69, 0.69), cc);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.81));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(0.990, 1.004, 1.011) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

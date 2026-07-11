uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.90;
	p = rot2((time * 0.55) * -0.40) * p;
	vec2 z = p;
	vec2 c = vec2(0.00 + 0.27 * sin((time * 0.55) * 0.78), -0.38 + 0.27 * cos((time * 0.55) * 0.57));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.10, -0.29)));
	}
	float v = exp(-trap * 3.52);
	vec3 col = vec3(0.5 + 0.5 * (v * 1.86)) * vec3(0.47, 0.44, 0.46) + vec3(0.03, 0.01, 0.07);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(0.952, 0.999, 0.929) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	p = rot2((time * 0.72) * 0.43) * p;
	vec2 z = p;
	vec2 c = vec2(-0.43 + 0.27 * sin((time * 0.72) * 1.02), -0.54 + 0.10 * cos((time * 0.72) * 0.94));
	float trap = 10.0;
	for(int oi = 0; oi < 9; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 5.99);
	float cc = clamp(0.5 + 0.5 * (v * 3.02), 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.26, 0.34), vec3(0.76, 0.75, 0.54), smoothstep(0.0, 1.0, cc));
	col += (hash21(gl_FragCoord.xy + fract((time * 0.72)) * 100.0) - 0.5) * 0.05;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.939, 0.994, 1.052) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

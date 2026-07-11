uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.68;
	vec2 z = p;
	vec2 c = vec2(0.19 + 0.15 * sin((time * 0.64) * 1.81), 0.09 + 0.20 * cos((time * 0.64) * 0.58));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.x));
	}
	float v = exp(-trap * 2.32);
	vec3 col = vec3(0.42, 0.47, 0.42) * (0.05 / (abs((v * 3.57)) + 0.07));
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.64)) * 100.0) - 0.5) * 0.12;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(1.015, 0.943, 1.000) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.76;
	vec2 z = p;
	vec2 c = vec2(0.01 + 0.29 * sin((time * 0.84) * 1.06), 0.20 + 0.22 * cos((time * 0.84) * 0.66));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.96);
	vec3 col = vec3(0.5 + 0.5 * (v * 3.29)) * vec3(0.53, 0.58, 0.58) + vec3(0.07, 0.01, 0.00);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.84)) * 100.0) - 0.5) * 0.10;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col = clamp(col, 0.0, 1.0) * vec3(0.975, 0.992, 0.960) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

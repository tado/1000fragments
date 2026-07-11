uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	vec2 z = p;
	vec2 c = vec2(-0.65 + 0.22 * sin((time * 0.55) * 1.11), -0.27 + 0.16 * cos((time * 0.55) * 1.20));
	float trap = 10.0;
	for(int oi = 0; oi < 21; oi++){
		z = abs(z);
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 4.29);
	float cc = clamp(0.5 + 0.5 * (v * 3.20), 0.0, 1.0);
	vec3 col = mix(vec3(0.69, 0.72, 0.75), vec3(0.09, 0.13, 0.11), cc);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.55)) * 100.0) - 0.5) * 0.10;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(0.911, 0.988, 1.023) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

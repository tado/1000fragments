uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.60;
	p = rot2(time * 0.42) * p;
	vec2 z = p;
	vec2 c = vec2(-0.08 + 0.14 * sin(time * 1.90), -0.37 + 0.16 * cos(time * 1.15));
	float trap = 10.0;
	for(int oi = 0; oi < 23; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(0.19, -0.22)));
	}
	float v = exp(-trap * 4.26);
	vec3 col = vec3(0.5 + 0.5 * v * 2.60) * vec3(1.43, 0.71, 1.14) + vec3(0.12, 0.17, 0.25);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

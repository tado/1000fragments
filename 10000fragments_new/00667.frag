uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.51;
	p = rot2(time * -0.58) * p;
	vec2 z = p;
	vec2 c = vec2(-0.80 + 0.18 * sin(time * 1.34), -0.08 + 0.15 * cos(time * 0.78));
	float trap = 10.0;
	for(int oi = 0; oi < 20; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z - vec2(-0.16, -0.22)));
	}
	float v = exp(-trap * 4.73);
	float cc = clamp(0.5 + 0.5 * v * 2.57, 0.0, 1.0);
	vec3 col = mix(vec3(0.29, 0.28, 0.10), vec3(0.86, 0.68, 0.40), cc);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

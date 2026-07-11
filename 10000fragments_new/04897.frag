uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.81;
	p = rot2(time * -0.56) * p;
	vec2 z = p;
	vec2 c = vec2(-0.79 + 0.07 * sin(time * 1.10), -0.38 + 0.19 * cos(time * 1.28));
	float trap = 10.0;
	for(int oi = 0; oi < 19; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, abs(z.y));
	}
	float v = exp(-trap * 2.17);
	float cc = clamp(0.5 + 0.5 * v * 3.01, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.06, 0.48), vec3(0.78, 0.85, 0.46), cc);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

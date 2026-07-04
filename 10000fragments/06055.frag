uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.41;
	p = rot2(time * -0.74) * p;
	vec2 z = p;
	vec2 c = vec2(-0.57 + 0.18 * sin(time * 1.50), 0.55 + 0.27 * cos(time * 0.76));
	float trap = 10.0;
	for(int oi = 0; oi < 11; oi++){
		z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
		trap = min(trap, length(z));
	}
	float v = exp(-trap * 2.63);
	float cc = clamp(0.5 + 0.5 * v * 3.17, 0.0, 1.0);
	vec3 col = mix(vec3(0.31, 0.20, 0.18), vec3(0.92, 0.77, 0.78), cc);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

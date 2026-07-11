uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.24;
	vec2 gp = p * 6.82;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.27 - 0.16 * sin((time * 0.76) * 2.71 + rnd * 6.2831853)) * 15.86);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.86, 0.88, 0.72), vec3(0.05, 0.14, 0.13), cc);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.76)) * 100.0) - 0.5) * 0.11;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(0.965, 0.992, 0.950) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

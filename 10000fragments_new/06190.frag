uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.71;
	vec2 gp = p * 6.42;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.17 - 0.19 * sin(time * 5.74 + rnd * 6.2831853)) * 15.43);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.14, 0.28, 0.34), vec3(0.82, 0.70, 0.57), cc);
	col *= 0.85 + 0.12 * sin(gl_FragCoord.y * 1.86 + time * 15.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

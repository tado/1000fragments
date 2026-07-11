uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.19;
	vec2 gp = p * 2.98;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 23.33 + rnd * 6.2831853 + time * 2.93);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.34, 0.23, 0.24), vec3(0.90, 0.77, 0.80), cc);
	col *= 0.68 + 0.32 * hash21(id + 11.0);
	col *= 0.82 + 0.19 * sin(gl_FragCoord.y * 1.66 + time * 6.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

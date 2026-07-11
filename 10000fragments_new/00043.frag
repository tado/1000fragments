uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.71;
	p = rot2(time * 0.49) * p;
	vec2 gp = p * 2.96;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.23 - 0.15 * sin(time * 5.75 + rnd * 6.2831853)) * 24.39);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.04, 0.40), vec3(0.66, 0.75, 0.77), cc);
	col *= 0.51 + 0.31 * hash21(id + 11.0);
	col *= 0.87 + 0.11 * sin(gl_FragCoord.y * 1.45 + time * 5.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

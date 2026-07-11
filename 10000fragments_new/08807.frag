uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.83;
	p = rot2(time * -1.55) * p;
	vec2 gp = p * 7.98;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 14.07 - time * 7.59 + rnd * 6.2831853);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.26, 0.19, 0.08), vec3(0.75, 0.83, 0.96), cc);
	col *= 0.64 + 0.36 * hash21(id + 11.0);
	col *= 0.87 + 0.18 * sin(gl_FragCoord.y * 2.86 + time * 16.59);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

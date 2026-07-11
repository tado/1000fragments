uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.31;
	p = rot2(time * 0.85) * p;
	vec2 gp = p * 4.35;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 25.96 - time * 5.13 + rnd * 6.2831853);
	vec3 col = vec3(0.19, 0.81, 0.46) * (0.07 / (abs(v) + 0.04));
	col = col / (1.0 + col);
	col *= 0.59 + 0.41 * hash21(id + 11.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.90 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.58;
	p = rot2(time * -0.55) * p;
	vec2 gp = p * 3.96;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 1.28 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 14.45 + rnd * 6.2831853 + time * 2.73);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.95 + time * 0.36);
	col *= 0.56 + 0.32 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

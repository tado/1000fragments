uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.85;
	vec2 gp = p * 3.75;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 1.43 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 21.27 + rnd * 6.2831853 + time * 3.78);
	vec3 col = vec3(0.16, 0.29, 0.18) * (0.06 / (abs(v) + 0.10));
	col = col / (1.0 + col);
	col *= 0.83 + 0.13 * sin(gl_FragCoord.y * 2.40 + time * 7.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

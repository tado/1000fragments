uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.33;
	p = rot2(time * -0.34) * p;
	vec2 gp = p * 5.18;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 1.59 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 8.87 + rnd * 6.2831853 + time * 1.99);
	vec3 col = vec3(0.25, 0.18, 0.95) * (0.17 / (abs(v) + 0.10));
	col = col / (1.0 + col);
	col = fract(col * 1.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

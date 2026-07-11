uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.62;
	vec2 gp = p * 2.15;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 1.74 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 16.52 + rnd * 6.2831853 + time * 2.04);
	vec3 col = vec3(0.54, 0.74, 0.20) * (0.16 / (abs(v) + 0.08));
	col = col / (1.0 + col);
	col *= 0.58 + 0.44 * hash21(id + 11.0);
	col *= 0.89 + 0.16 * sin(gl_FragCoord.y * 2.32 + time * 4.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

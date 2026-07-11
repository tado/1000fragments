uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.19) * p;
	vec2 gp = p * 3.97;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 2.05 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 11.99 + rnd * 6.2831853 + time * 1.06);
	vec3 col = vec3(0.98, 0.43, 0.29) * (0.15 / (abs(v) + 0.06));
	col = col / (1.0 + col);
	col *= 0.90 + 0.14 * sin(gl_FragCoord.y * 0.81 + time * 5.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -1.48) * p;
	vec2 gp = p * 3.87;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 1.20 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 11.99 + rnd * 6.2831853 + time * 2.99);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.37, 0.30, 0.28), vec3(0.59, 0.62, 0.96), cc);
	col *= 0.68 + 0.48 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

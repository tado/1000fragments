uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.19;
	p = rot2(time * -0.87) * p;
	vec2 gp = p * 3.79;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 2.39 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 22.71 + rnd * 6.2831853 + time * 2.10);
	vec3 col = vec3(0.71, 0.49, 0.91) * (0.25 / (abs(v) + 0.07));
	col = col / (1.0 + col);
	col *= 0.86 + 0.18 * sin(gl_FragCoord.y * 2.55 + time * 9.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

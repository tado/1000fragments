uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.64;
	vec2 gp = p * 4.56;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + (time * 0.79) * 0.57 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 8.50 + rnd * 6.2831853 + (time * 0.79) * 3.73);
	vec3 col = vec3(0.48, 0.37, 0.51) * (0.09 / (abs((v)) + 0.08));
	col = col / (1.0 + col);
	col *= 0.57 + 0.35 * hash21(id + 11.0);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.79)) * 100.0) - 0.5) * 0.05;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col = clamp(col, 0.0, 1.0) * vec3(1.001, 0.981, 0.992) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.13;
	p = rot2(time * 0.91) * p;
	vec2 gp = p * 6.03;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + time * 1.16 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 9.64 + rnd * 6.2831853 + time * 3.24);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.33, 1.49, 0.66) + vec3(0.23, 0.05, 0.23);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

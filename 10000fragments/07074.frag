uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.43;
	p = rot2(time * -0.70) * p;
	vec2 gp = p * 7.72;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 22.16 + rnd * 6.2831853 + time * 2.19);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.34, 1.22, 0.76) + vec3(0.20, 0.03, 0.17);
	col *= 0.64 + 0.44 * hash21(id + 11.0);
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.04;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

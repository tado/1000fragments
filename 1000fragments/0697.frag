uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.03;
	p = rot2(time * -1.49) * p;
	vec2 gp = p * 4.52;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 18.03 + rnd * 6.2831853 + time * 2.45);
	vec3 col = vec3(0.89, 0.29, 0.68) * (0.08 / (abs(v) + 0.05));
	col = col / (1.0 + col);
	col *= 0.59 + 0.32 * hash21(id + 11.0);
	col = clamp((col - 0.5) * 1.28 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

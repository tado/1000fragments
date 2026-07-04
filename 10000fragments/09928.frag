uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.35;
	p = rot2(time * -1.49) * p;
	vec2 gp = p * 3.75;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 10.70 + rnd * 6.2831853 + time * 5.17);
	vec3 col = vec3(0.44, 0.77, 0.81) * (0.07 / (abs(v) + 0.04));
	col = col / (1.0 + col);
	col *= 0.53 + 0.39 * hash21(id + 11.0);
	col = fract(col * 1.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

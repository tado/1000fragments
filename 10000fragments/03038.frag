uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -1.31) * p;
	vec2 gp = p * 6.52;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 12.85 + rnd * 6.2831853 + time * 4.24);
	vec3 col = vec3(0.46, 0.48, 0.75) * (0.19 / (abs(v) + 0.04));
	col = col / (1.0 + col);
	col = fract(col * 1.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 gp = p * 3.88;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 14.61 + rnd * 6.2831853 + time * 3.38);
	vec3 col = vec3(0.41, 0.61, 0.56) * (0.20 / (abs(v) + 0.08));
	col = col / (1.0 + col);
	col *= 0.54 + 0.39 * hash21(id + 11.0);
	col = fract(col * 1.35);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

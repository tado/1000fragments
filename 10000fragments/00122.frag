uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 gp = p * 3.96;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 21.55 + rnd * 6.2831853 + time * 4.64);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.10, 0.34, 0.16), vec3(0.97, 0.96, 0.50), cc);
	col *= 0.57 + 0.38 * hash21(id + 11.0);
	col = fract(col * 2.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

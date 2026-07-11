uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 gp = p * 6.33;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 23.44 + rnd * 6.2831853 + time * 6.54);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.33, 0.13, 0.49), vec3(0.95, 0.87, 0.93), cc);
	col *= 0.57 + 0.41 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.26));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 gp = p * 5.63;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 10.57 - time * 6.12 + rnd * 6.2831853);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.06, 0.26, 0.27), vec3(0.76, 0.98, 0.49), cc);
	col *= 0.66 + 0.33 * hash21(id + 11.0);
	col *= 0.83 + 0.13 * sin(gl_FragCoord.y * 2.10 + time * 12.47);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

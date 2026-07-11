uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.58;
	vec2 gp = p * 6.91;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 24.35 - time * 4.71 + rnd * 6.2831853);
	vec3 col = vec3(0.34, 0.68, 0.73) * (0.14 / (abs(v) + 0.06));
	col = col / (1.0 + col);
	col *= 0.66 + 0.38 * hash21(id + 11.0);
	col = fract(col * 1.08);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

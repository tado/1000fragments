uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.82;
	vec2 gp = p * 2.49;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 14.38 - time * 6.82 + rnd * 6.2831853);
	vec3 col = vec3(0.79, 0.46, 0.28) * (0.23 / (abs(v) + 0.09));
	col = col / (1.0 + col);
	col *= 0.64 + 0.34 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

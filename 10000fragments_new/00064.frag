uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.85;
	vec2 gp = p * 5.36;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 25.16 - time * 7.21 + rnd * 6.2831853);
	vec3 col = vec3(0.82, 0.39, 0.20) * (0.24 / (abs(v) + 0.04));
	col = col / (1.0 + col);
	col *= 0.69 + 0.43 * hash21(id + 11.0);
	col *= 0.84 + 0.15 * sin(gl_FragCoord.y * 2.86 + time * 7.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

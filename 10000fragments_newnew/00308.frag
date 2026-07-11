uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.69;
	vec2 gp = p * 3.22;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 23.34 - time * 3.11 + rnd * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(0.70, 1.10, 1.30) + vec3(0.19, 0.16, 0.06);
	col *= 0.50 + 0.49 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

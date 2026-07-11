uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.20;
	vec2 gp = p * 4.65;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 20.35 - time * 7.65 + rnd * 6.2831853);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.38, 0.32), vec3(0.71, 0.55, 0.98), cc);
	col *= 0.65 + 0.30 * hash21(id + 11.0);
	col = mod(col * 1.63, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

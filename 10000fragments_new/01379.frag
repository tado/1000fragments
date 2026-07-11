uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.27;
	vec2 gp = p * 7.08;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 17.75 - time * 6.45 + rnd * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.25, 0.94, 1.02) + vec3(0.17, 0.18, 0.08);
	col = mod(col * 1.66, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

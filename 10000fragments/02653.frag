uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.46;
	vec2 gp = p * 2.28;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 21.39 - time * 2.36 + rnd * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(0.56, 1.00, 1.39) + vec3(0.08, 0.02, 0.06);
	col *= 0.53 + 0.39 * hash21(id + 11.0);
	col = clamp((col - 0.5) * 1.80 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

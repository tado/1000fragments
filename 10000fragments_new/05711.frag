uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.33;
	vec2 gp = p * 4.97;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 15.73 - time * 5.80 + rnd * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(0.63, 1.13, 0.91) + vec3(0.19, 0.07, 0.12);
	col *= 0.56 + 0.36 * hash21(id + 11.0);
	col = clamp((col - 0.5) * 2.09 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

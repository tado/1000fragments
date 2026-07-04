uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.99;
	vec2 gp = p * 7.13;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 11.11 - time * 6.31 + rnd * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(0.62, 1.08, 1.43) + vec3(0.19, 0.21, 0.13);
	col = clamp((col - 0.5) * 2.12 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

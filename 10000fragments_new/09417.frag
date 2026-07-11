uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.42;
	vec2 gp = p * 3.21;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 12.38 - time * 5.26 + rnd * 6.2831853);
	vec3 col = vec3(0.88, 0.85, 0.19) * (0.16 / (abs(v) + 0.09));
	col = col / (1.0 + col);
	col *= 0.81 + 0.15 * sin(gl_FragCoord.y * 2.66 + time * 10.29);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 7.69;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 11.88 - time * 2.09 + rnd * 6.2831853);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 1.94 + time * 0.33);
	col *= 0.69 + 0.38 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

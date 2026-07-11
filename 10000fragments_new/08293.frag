uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 gp = p * 7.96;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.29 - 0.12 * sin(time * 2.71 + rnd * 6.2831853)) * 22.29);
	vec3 col = vec3(0.94, 0.89, 0.16) * (0.22 / (abs(v) + 0.04));
	col = col / (1.0 + col);
	col *= 0.83 + 0.15 * sin(gl_FragCoord.y * 1.74 + time * 13.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 gp = p * 7.51;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.19 - 0.09 * sin(time * 2.13 + rnd * 6.2831853)) * 12.15);
	vec3 col = vec3(0.70, 0.99, 0.96) * (0.14 / (abs(v) + 0.05));
	col = col / (1.0 + col);
	col *= 0.62 + 0.48 * hash21(id + 11.0);
	col = mod(col * 2.91, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

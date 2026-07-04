uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.70;
	vec2 gp = p * 5.34;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.16 - 0.13 * sin(time * 4.67 + rnd * 6.2831853)) * 20.67);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.10, 1.45, 1.31) + vec3(0.11, 0.16, 0.17);
	col *= 0.67 + 0.33 * hash21(id + 11.0);
	col = mod(col * 2.21, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.99;
	vec2 gp = p * 2.67;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.21 - 0.19 * sin(time * 1.85 + rnd * 6.2831853)) * 17.11);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.27, 1.13, 0.74) + vec3(0.19, 0.24, 0.22);
	col *= 0.57 + 0.49 * hash21(id + 11.0);
	col = fract(col * 1.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

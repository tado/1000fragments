uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.40;
	vec2 gp = p * 3.59;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.27 - 0.19 * sin(time * 2.10 + rnd * 6.2831853)) * 11.35);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.22, 1.23, 0.61) + vec3(0.18, 0.08, 0.22);
	col *= 0.50 + 0.43 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

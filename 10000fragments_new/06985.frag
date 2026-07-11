uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.73;
	vec2 gp = p * 3.94;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.16 - 0.14 * sin(time * 4.63 + rnd * 6.2831853)) * 10.20);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.20, 0.81, 1.24) + vec3(0.24, 0.20, 0.12);
	col *= 0.66 + 0.43 * hash21(id + 11.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.04 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 3.76;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.26 - 0.19 * sin(time * 1.51 + rnd * 6.2831853)) * 22.50);
	vec3 col = vec3(0.24, 0.79, 0.59) * (0.08 / (abs(v) + 0.05));
	col = col / (1.0 + col);
	col *= 0.66 + 0.38 * hash21(id + 11.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.88 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

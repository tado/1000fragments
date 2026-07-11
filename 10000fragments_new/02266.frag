uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 3.02;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.18 - 0.13 * sin(time * 2.13 + rnd * 6.2831853)) * 24.41);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.12, 1.12, 1.16) + vec3(0.02, 0.19, 0.14);
	col *= 0.69 + 0.37 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

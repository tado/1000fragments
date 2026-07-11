uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.14;
	vec2 gp = p * 4.83;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.28 - 0.16 * sin(time * 5.12 + rnd * 6.2831853)) * 21.75);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 2.19 + time * 0.57);
	col *= 0.53 + 0.48 * hash21(id + 11.0);
	col *= 0.87 + 0.18 * sin(gl_FragCoord.y * 1.44 + time * 14.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

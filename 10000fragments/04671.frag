uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 4.15;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.17 - 0.09 * sin(time * 3.96 + rnd * 6.2831853)) * 24.63);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 4.51 + time * 0.07);
	col *= 0.65 + 0.48 * hash21(id + 11.0);
	col = mod(col * 1.72, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.67;
	vec2 gp = p * 2.96;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.27 - 0.13 * sin(time * 2.25 + rnd * 6.2831853)) * 17.34);
	vec3 col = vec3(0.93, 0.47, 0.33) * (0.16 / (abs(v) + 0.08));
	col = col / (1.0 + col);
	col = fract(col * 2.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

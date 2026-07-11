uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.39;
	vec2 gp = p * 6.40;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 24.97 - time * 6.32 + rnd * 6.2831853);
	vec3 col = vec3(0.39, 0.90, 0.34) * (0.23 / (abs(v) + 0.03));
	col = col / (1.0 + col);
	col *= 0.59 + 0.40 * hash21(id + 11.0);
	col = mod(col * 2.25, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

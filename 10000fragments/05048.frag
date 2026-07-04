uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.54;
	vec2 gp = p * 6.55;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 17.41 - time * 4.17 + rnd * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(0.91, 1.12, 1.01) + vec3(0.21, 0.07, 0.12);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

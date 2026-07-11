uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.48;
	vec2 gp = p * 5.60;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 21.21 - time * 7.97 + rnd * 6.2831853);
	vec3 col = vec3(0.30, 0.19, 0.82) * (0.15 / (abs(v) + 0.06));
	col = col / (1.0 + col);
	col = fract(col * 1.58);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

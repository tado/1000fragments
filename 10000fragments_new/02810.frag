uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.58;
	vec2 gp = p * 4.88;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 22.46 - time * 6.88 + rnd * 6.2831853);
	vec3 col = vec3(0.23, 0.15, 0.96) * (0.08 / (abs(v) + 0.05));
	col = col / (1.0 + col);
	col = fract(col * 1.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

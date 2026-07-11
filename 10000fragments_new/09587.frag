uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.06;
	p = rot2(time * 0.98) * p;
	vec2 gp = p * 6.76;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 24.51 - time * 6.23 + rnd * 6.2831853);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.13, 0.59, 1.11) + vec3(0.21, 0.03, 0.25);
	col *= 0.60 + 0.41 * hash21(id + 11.0);
	col = fract(col * 2.22);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

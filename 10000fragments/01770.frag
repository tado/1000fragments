uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.75;
	p = rot2(time * -0.72) * p;
	vec2 gp = p * 3.73;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 17.60 - time * 2.33 + rnd * 6.2831853);
	vec3 col = vec3(0.56, 0.60, 0.66) * (0.05 / (abs(v) + 0.06));
	col = col / (1.0 + col);
	col *= 0.82 + 0.18 * sin(gl_FragCoord.y * 1.14 + time * 7.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

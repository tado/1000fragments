uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.42;
	p = rot2(time * -1.33) * p;
	vec2 gp = p * 2.50;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 18.80 - time * 4.26 + rnd * 6.2831853);
	vec3 col = vec3(0.62, 0.25, 0.53) * (0.14 / (abs(v) + 0.02));
	col = col / (1.0 + col);
	col *= 0.58 + 0.39 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

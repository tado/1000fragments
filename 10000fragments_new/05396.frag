uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.29;
	p = rot2(time * 1.59) * p;
	vec2 gp = p * 2.77;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.26 - 0.20 * sin(time * 2.98 + rnd * 6.2831853)) * 24.74);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + v * 3.46 + time * 0.82);
	col *= 0.54 + 0.35 * hash21(id + 11.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.13 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

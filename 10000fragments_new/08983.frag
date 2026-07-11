uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.58;
	p = rot2(time * -0.63) * p;
	vec2 gp = p * 7.22;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.17 - 0.17 * sin(time * 2.85 + rnd * 6.2831853)) * 10.53);
	vec3 col = vec3(0.76, 0.64, 0.57) * (0.10 / (abs(v) + 0.08));
	col = col / (1.0 + col);
	col *= 0.62 + 0.36 * hash21(id + 11.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.85 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

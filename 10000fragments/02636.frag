uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.77) * p;
	vec2 gp = p * 7.25;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.25 - 0.20 * sin(time * 2.02 + rnd * 6.2831853)) * 22.69);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.34, 0.94, 1.47) + vec3(0.20, 0.09, 0.11);
	col *= 0.64 + 0.47 * hash21(id + 11.0);
	col *= 0.83 + 0.19 * sin(gl_FragCoord.y * 1.54 + time * 7.11);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

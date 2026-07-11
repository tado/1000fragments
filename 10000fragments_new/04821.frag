uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.78;
	p = rot2(time * -1.02) * p;
	vec2 gp = p * 3.92;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.30 - 0.12 * sin(time * 2.37 + rnd * 6.2831853)) * 15.94);
	vec3 col = vec3(0.31, 0.22, 0.91) * (0.09 / (abs(v) + 0.05));
	col = col / (1.0 + col);
	col *= 0.52 + 0.33 * hash21(id + 11.0);
	col *= 0.87 + 0.17 * sin(gl_FragCoord.y * 2.44 + time * 17.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

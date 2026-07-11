uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.54;
	p = rot2(time * -1.46) * p;
	vec2 gp = p * 2.30;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.18 - 0.19 * sin(time * 5.00 + rnd * 6.2831853)) * 21.26);
	vec3 col = vec3(0.26, 0.21, 0.28) * (0.09 / (abs(v) + 0.08));
	col = col / (1.0 + col);
	col *= 0.87 + 0.19 * sin(gl_FragCoord.y * 2.91 + time * 17.16);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

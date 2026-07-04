uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.97;
	p = rot2(time * -1.22) * p;
	vec2 gp = p * 3.34;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 8.21 + rnd * 6.2831853 + time * 5.99);
	vec3 col = vec3(0.5 + 0.5 * v) * vec3(1.17, 1.12, 1.28) + vec3(0.05, 0.03, 0.02);
	col *= 0.54 + 0.45 * hash21(id + 11.0);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

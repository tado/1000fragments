uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.83;
	p = rot2(time * 1.00) * p;
	vec2 gp = p * 3.20;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 13.30 + rnd * 6.2831853 + time * 3.20);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.04, 0.22, 0.24), vec3(0.71, 0.84, 0.75), cc);
	col *= 0.61 + 0.38 * hash21(id + 11.0);
	col *= 0.84 + 0.15 * sin(gl_FragCoord.y * 1.84 + time * 5.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

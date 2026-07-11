uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.54;
	p = rot2(time * -0.60) * p;
	vec2 gp = p * 3.84;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 17.81 + rnd * 6.2831853 + time * 2.03);
	vec3 col = vec3(0.51, 0.99, 0.97) * (0.06 / (abs(v) + 0.04));
	col = col / (1.0 + col);
	col *= 0.63 + 0.46 * hash21(id + 11.0);
	col = mod(col * 1.85, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

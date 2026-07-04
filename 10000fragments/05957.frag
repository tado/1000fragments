uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.65;
	vec2 gp = p * 5.51;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 21.97 + rnd * 6.2831853 + time * 2.02);
	vec3 col = vec3(0.46, 0.25, 0.94) * (0.15 / (abs(v) + 0.09));
	col = col / (1.0 + col);
	col *= 0.68 + 0.36 * hash21(id + 11.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

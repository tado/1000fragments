uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.48;
	vec2 gp = p * 4.67;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 18.22 + rnd * 6.2831853 + time * 6.23);
	vec3 col = vec3(0.18, 0.74, 0.37) * (0.22 / (abs(v) + 0.09));
	col = col / (1.0 + col);
	col *= 0.64 + 0.30 * hash21(id + 11.0);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.10 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

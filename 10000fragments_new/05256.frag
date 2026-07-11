uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 2.82;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 10.69 + rnd * 6.2831853 + time * 5.93);
	vec3 col = vec3(0.58, 0.19, 0.34) * (0.18 / (abs(v) + 0.04));
	col = col / (1.0 + col);
	col *= 0.60 + 0.33 * hash21(id + 11.0);
	col = mod(col * 1.37, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.33;
	vec2 gp = p * 4.35;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 21.45 + rnd * 6.2831853 + time * 5.76);
	vec3 col = vec3(0.76, 0.36, 0.27) * (0.14 / (abs(v) + 0.04));
	col = col / (1.0 + col);
	col = mod(col * 1.78, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

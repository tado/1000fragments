uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 5.34;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 21.51 + rnd * 6.2831853 + time * 4.70);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.19, 0.28, 0.10), vec3(0.55, 0.68, 0.44), cc);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.11 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

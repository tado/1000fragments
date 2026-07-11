uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 gp = p * 5.78;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 22.72 + rnd * 6.2831853 + time * 2.78);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.07, 0.22, 0.47), vec3(0.73, 0.85, 0.82), cc);
	col *= 0.52 + 0.36 * hash21(id + 11.0);
	col = fract(col * 1.25);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

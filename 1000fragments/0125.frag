uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.55) * p;
	vec2 gp = p * 7.50;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 13.43 + rnd * 6.2831853 + time * 2.65);
	float cc = clamp(0.5 + 0.5 * v, 0.0, 1.0);
	vec3 col = mix(vec3(0.21, 0.25, 0.08), vec3(0.70, 0.97, 0.92), cc);
	col *= 0.56 + 0.33 * hash21(id + 11.0);
	col = fract(col * 2.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

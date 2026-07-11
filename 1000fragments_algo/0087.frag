uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 1.37 + (time * 0.63) * 1.29) * 0.07;
	p.x *= resolution.x / resolution.y;
	vec2 gp = p * 4.41;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 22.77 + rnd * 6.2831853 + (time * 0.63) * 6.43);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.08, 0.08, 0.00), vec3(0.77, 0.76, 0.73), cc);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.63)) * 100.0) - 0.5) * 0.11;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.65);
	col = clamp(col, 0.0, 1.0) * vec3(1.012, 0.954, 1.006) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

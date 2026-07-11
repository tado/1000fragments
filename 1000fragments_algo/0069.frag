uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 gp = p * 4.60;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 20.98 + rnd * 6.2831853 + (time * 0.83) * 2.81);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.24, 0.28, 0.27), vec3(0.68, 0.46, 0.47), smoothstep(0.0, 1.0, cc));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(1.003, 0.962, 1.027) * 1.00 + 0.032;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

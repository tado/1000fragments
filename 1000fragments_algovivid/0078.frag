uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x);
	p.y += sin(p.x * 2.77 + (time * 0.78) * 0.64) * 0.08;
	p.x *= resolution.x / resolution.y;
	vec2 gp = p * 2.39;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 20.08 + rnd * 6.2831853 + (time * 0.78) * 3.88);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.63, 0.61, 0.69) + vec3(0.11, 0.09, 0.10);
	col *= 0.55 + 0.34 * hash21(id + 11.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.33);
	col = clamp(col, 0.0, 1.0) * vec3(0.932, 0.974, 1.042) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

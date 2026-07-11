uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.63) * 0.37), cos((time * 0.63) * 0.77)) * 0.09;
	p *= 0.72;
	p.x *= resolution.x / resolution.y;
	p = rot2((time * 0.63) * 1.40) * p;
	vec2 gp = p * 2.86;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 10.36 + rnd * 6.2831853 + (time * 0.63) * 6.88);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.35, 0.37, 0.21), vec3(0.66, 0.53, 0.62), smoothstep(0.0, 1.0, cc));
	col *= 0.61 + 0.43 * hash21(id + 11.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(1.032, 0.998, 0.911) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

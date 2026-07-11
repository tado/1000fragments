uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.02;
	p.x *= resolution.x / resolution.y;
	p *= 1.89;
	p = rot2((time * 0.68) * 1.18) * p;
	vec2 gp = p * 3.56;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + (time * 0.68) * 1.07 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 15.87 + rnd * 6.2831853 + (time * 0.68) * 1.04);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.32, 0.38, 0.17), vec3(0.63, 0.66, 0.68), smoothstep(0.0, 1.0, cc));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.47);
	col = clamp(col, 0.0, 1.0) * vec3(1.028, 0.952, 1.021) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

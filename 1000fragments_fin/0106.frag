uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * -0.34;
	p = rot2((time * 0.89) * 1.22) * p;
	vec2 gp = p * 6.54;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + (time * 0.89) * 1.86 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 8.36 + rnd * 6.2831853 + (time * 0.89) * 3.15);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.53, 0.46, 0.52) + vec3(0.10, 0.12, 0.08);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.11));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.012, 0.959, 1.003);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

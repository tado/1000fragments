uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.94 + (time * 0.70) * 0.81) * 0.19;
	p.x += p.y * -0.45;
	p = rot2((time * 0.70) * 1.04) * p;
	vec2 gp = p * 6.22;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + (time * 0.70) * 1.45 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 10.63 + rnd * 6.2831853 + (time * 0.70) * 2.41);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.885, 0.892, 0.925), vec3(0.850, 0.309, 0.250), smoothstep(0.0, 1.0, cc));
	col = clamp((col - 0.5) * 1.81 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(1.031, 0.999, 0.928);
	col += 0.004;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

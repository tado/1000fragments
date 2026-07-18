uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * 0.28;
	p.x *= resolution.x / resolution.y;
	p *= 2.62;
	vec2 gp = p * 3.79;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 26.65 - (time * 0.75) * 7.91 + rnd * 6.2831853);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.149, 0.047, 0.074), vec3(0.957, 0.758, 0.741), smoothstep(0.0, 1.0, cc));
	col *= 0.59 + 0.44 * hash21(id + 11.0);
	col = clamp((col - 0.5) * 1.65 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(1.027, 0.945, 0.998);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

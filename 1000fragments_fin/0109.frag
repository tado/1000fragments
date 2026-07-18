uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.23;
	vec2 gp = p * 4.91;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 20.97 - (time * 0.73) * 5.17 + rnd * 6.2831853);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.010, 0.052, 0.118), vec3(0.078, 0.460, 0.482), smoothstep(0.0, 0.43, cc)), vec3(0.995, 0.844, 0.454), smoothstep(0.43, 1.0, cc));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(0.944, 0.973, 1.045);
	col += 0.010;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

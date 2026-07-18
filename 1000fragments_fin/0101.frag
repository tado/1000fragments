uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.16;
	vec2 gp = p * 5.81;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	vec2 sv = rot2(floor(rnd * 4.0) * 0.7853982 + (time * 0.75) * 1.01 * (step(0.5, hash21(id + 3.3)) * 2.0 - 1.0)) * gv;
	float v = sin(sv.x * 17.50 + rnd * 6.2831853 + (time * 0.75) * 3.87);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.132, 0.026, 0.142), vec3(0.729, 0.346, 0.459), smoothstep(0.0, 0.43, cc)), vec3(0.994, 0.914, 0.815), smoothstep(0.43, 1.0, cc));
	col *= 0.60 + 0.48 * hash21(id + 11.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(0.934, 0.983, 1.033);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.41 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

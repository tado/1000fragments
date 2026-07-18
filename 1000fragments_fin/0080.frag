uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 gp = p * 2.93;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float v = sin((length(gv) - 0.17 - 0.10 * sin((time * 0.67) * 1.53 + rnd * 6.2831853)) * 14.00);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.119, 0.056, 0.148), vec3(0.657, 0.964, 0.795), smoothstep(0.0, 1.0, cc));
	col = clamp((col - 0.5) * 1.47 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.28);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.037, 1.001, 0.925);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

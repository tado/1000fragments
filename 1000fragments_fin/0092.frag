uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 2.59 + (time * 0.90) * 0.56) * 0.05;
	vec2 gp = p * 3.77;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 22.52 + rnd * 6.2831853 + (time * 0.90) * 5.28);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.49, 0.56, 0.40) + vec3(0.12, 0.05, 0.07);
	col *= 0.53 + 0.35 * hash21(id + 11.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(1.002, 0.947, 1.006);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

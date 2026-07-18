uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * -0.54;
	p.y += sin(p.x * 1.91 + (time * 0.58) * 0.61) * 0.19;
	p *= 1.73;
	vec2 gp = p * 6.95;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	if(rnd < 0.5) gv.x = -gv.x;
	float v = sin((gv.x + gv.y) * 8.93 + rnd * 6.2831853 + (time * 0.58) * 2.70);
	vec3 col = vec3(0.801, 0.684, 0.995) * (0.07 / (abs((v)) + 0.08));
	col = col / (1.0 + col);
	col *= 0.60 + 0.31 * hash21(id + 11.0);
	col *= 0.84 + 0.11 * sin(gl_FragCoord.y * 2.46 + (time * 0.58) * 13.67);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(0.999, 0.990, 0.993);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

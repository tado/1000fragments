uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.78) * 0.86), cos((time * 0.78) * 0.52)) * 0.24;
	p.x = abs(p.x);
	p.x *= resolution.x / resolution.y;
	p *= 2.79;
	p = rot2((time * 0.78) * -0.41) * p;
	vec2 gp = p * 3.91;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 22.66 - (time * 0.78) * 7.52 + rnd * 6.2831853);
	vec3 col = vec3(0.987, 0.855, 0.452) * (0.11 / (abs((v)) + 0.10));
	col = col / (1.0 + col);
	col *= 0.80 + 0.13 * sin(gl_FragCoord.y * 1.72 + (time * 0.78) * 6.22);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.032, 1.010, 0.935);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.63) * 0.96), cos((time * 0.63) * 1.13)) * 0.12;
	p *= 2.17;
	p = rot2((time * 0.63) * -0.48) * p;
	vec2 gp = p * 5.43;
	vec2 id = floor(gp); vec2 gv = fract(gp) - 0.5;
	float rnd = hash21(id);
	float sq = max(abs(gv.x), abs(gv.y));
	float v = sin(sq * 22.95 - (time * 0.63) * 6.99 + rnd * 6.2831853);
	vec3 col = vec3(0.935, 0.481, 0.394) * (0.11 / (abs((v)) + 0.07));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.013, 1.000, 1.006);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.36 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

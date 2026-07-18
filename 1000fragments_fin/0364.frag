uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 2.22;
	p = rot2((time * 0.89) * -0.83) * p;
	vec3 col = mix(vec3(0.012, 0.062, 0.077), vec3(0.023, 0.081, 0.097), clamp(0.5 + p.y * -0.18 + p.x * 0.02, 0.0, 1.0));
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.89) * 1.14 * (0.3 + fi * 0.12) + fi * 2.4), cos((time * 0.89) * 1.59 * (0.4 + fi * 0.22) + fi * 1.7)) * 0.75;
		vec2 bq = abs(p - q) - vec2(0.13, 0.13);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(5.848, 6.822, 7.796) + fi * 0.62 + (time * 0.89) * 0.38)) * (0.031 / (gd + 0.042));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col *= vec3(0.998, 1.001, 1.003);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

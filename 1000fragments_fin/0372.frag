uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x -= max(0.0, resolution.x / resolution.y - 1.8) * 0.5;
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p *= 1.22;
	p = rot2((time * 0.76) * 0.30) * p;
	vec3 col = mix(vec3(0.013, 0.037, 0.040), vec3(0.026, 0.049, 0.076), clamp(0.5 + p.y * -0.13 + p.x * -0.22, 0.0, 1.0));
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.76) * 1.42 * (0.3 + fi * 0.11) + fi * 2.4), cos((time * 0.76) * 1.55 * (0.4 + fi * 0.16) + fi * 1.7)) * 0.71;
		vec2 bq = abs(p - q) - vec2(0.06, 0.24);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(6.051, 7.427, 8.802) + fi * 0.65 + (time * 0.76) * 0.71)) * (0.039 / (gd + 0.041));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.50);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(1.006, 0.951, 1.010);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

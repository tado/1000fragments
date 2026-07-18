uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 2.27 + (time * 0.74) * 0.48) * 0.17;
	p.x *= resolution.x / resolution.y;
	p *= min(1.0, 1.778 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 2.42;
	p = rot2((time * 0.74) * 1.03) * p;
	vec3 col = mix(vec3(0.023, 0.044, 0.080), vec3(0.019, 0.039, 0.124), clamp(0.5 + p.y * -0.53 + p.x * -0.03, 0.0, 1.0));
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.74) * 0.76 * (0.3 + fi * 0.24) + fi * 2.4), cos((time * 0.74) * 1.07 * (0.4 + fi * 0.24) + fi * 1.7)) * 0.95;
		vec2 bq = abs(p - q) - vec2(0.24, 0.14);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(2.675, 3.710, 4.745) + fi * 0.67 + (time * 0.74) * 1.13)) * (0.035 / (gd + 0.013));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col *= vec3(1.012, 0.993, 0.943);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.44 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

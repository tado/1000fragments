uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.84 + (time * 0.92) * 0.92) * 0.14;
	p = rot2((time * 0.92) * 0.54) * p;
	vec3 col = vec3(0.009, 0.010, 0.056);
	for(int li = 0; li < 8; li++){
		float fl = float(li);
		float fy = (fl / 8.0 - 0.5) * 1.78;
		float w = 0.12 * sin(p.x * 2.23 + (time * 0.92) * 1.35 + fl * 0.92);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(2.768, 3.686, 4.604) + fl * 0.21 + (time * 0.92) * 0.82)) * (0.0033 / (ld + 0.0113));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(1.011, 0.955, 1.001);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

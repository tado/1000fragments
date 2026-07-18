uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p = rot2((time * 0.58) * 1.55) * p;
	vec3 col = mix(vec3(0.015, 0.067, 0.086), vec3(0.017, 0.058, 0.054), clamp(0.5 + p.y * -0.65 + p.x * 0.06, 0.0, 1.0));
	for(int li = 0; li < 8; li++){
		float fl = float(li);
		float fy = (fl / 8.0 - 0.5) * 1.86;
		float w = 0.21 * sin(p.x * 5.25 + (time * 0.58) * 4.36 + fl * 1.52) * exp(-p.x * p.x * 2.17);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(4.904, 6.186, 7.469) + fl * 0.59 + (time * 0.58) * 0.68)) * (0.0034 / (ld + 0.0107));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.007, 0.986, 0.993);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.22 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

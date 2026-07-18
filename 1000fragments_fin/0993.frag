uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p = rot2((time * 0.88) * -0.66) * p;
	vec3 col = mix(vec3(0.027, 0.051, 0.069), vec3(0.042, 0.017, 0.101), clamp(0.5 + p.y * 0.44 + p.x * 0.20, 0.0, 1.0));
	for(int li = 0; li < 9; li++){
		float fl = float(li);
		float fy = (fl / 9.0 - 0.5) * 1.51;
		float w = 0.06 * sin(p.x * 2.63 + (time * 0.88) * 4.44 + fl * 0.41);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(1.355, 3.357, 5.358) + fl * 0.64 + (time * 0.88) * 0.99)) * (0.0038 / (ld + 0.0094));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.23);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(0.970, 1.002, 0.946);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

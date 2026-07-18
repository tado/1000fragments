uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	p = rot2((time * 0.63) * -1.02) * p;
	vec3 col = mix(vec3(0.022, 0.042, 0.056), vec3(0.014, 0.023, 0.059), clamp(0.5 + p.y * -0.58 + p.x * 0.17, 0.0, 1.0));
	for(int li = 0; li < 12; li++){
		float fl = float(li);
		float fy = (fl / 12.0 - 0.5) * 2.10;
		float w = 0.26 * sin(p.x * 5.46 + (time * 0.63) * 4.31 + fl * 0.95) * exp(-p.x * p.x * 1.67);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(2.775, 4.329, 5.883) + fl * 0.41 + (time * 0.63) * 1.17)) * (0.0029 / (ld + 0.0113));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.29));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(0.987, 1.007, 0.993);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

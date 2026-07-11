uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.40 + (time * 0.83) * 0.98) * 0.09;
	p.x = abs(p.x) - 0.48;
	p = rot2((time * 0.83) * -0.64) * p;
	vec3 col = vec3(0.001, 0.034, 0.025);
	for(int li = 0; li < 21; li++){
		float fl = float(li);
		float fy = (fl / 21.0 - 0.5) * 1.91;
		float w = 0.18 * sin(p.x * 6.28 + (time * 0.83) * 3.93 + fl * 0.84) * exp(-p.x * p.x * 1.78);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.04, 2.08) + fl * 0.45 + (time * 0.83) * 0.56)) * (0.0055 / (ld + 0.0047));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(0.924, 0.985, 1.040) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

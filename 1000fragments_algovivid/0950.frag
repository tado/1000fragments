uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2((time * 0.82) * 0.41) * p;
	vec3 col = vec3(0.022, 0.023, 0.045);
	for(int li = 0; li < 11; li++){
		float fl = float(li);
		float fy = (fl / 11.0 - 0.5) * 2.10;
		float w = 0.10 * sin(p.x * 4.65 + (time * 0.82) * 2.94 + fl * 1.38);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.77, 1.54) + fl * 0.24 + (time * 0.82) * 1.04)) * (0.0046 / (ld + 0.0056));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col = clamp(col, 0.0, 1.0) * vec3(1.040, 0.982, 0.933) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

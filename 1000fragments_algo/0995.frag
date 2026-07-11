uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2((time * 0.80) * -0.91) * p;
	vec3 col = vec3(0.005, 0.023, 0.004);
	for(int li = 0; li < 9; li++){
		float fl = float(li);
		float fy = (fl / 9.0 - 0.5) * 1.94;
		float w = 0.22 * sin(p.x * 5.12 + (time * 0.80) * 3.44 + fl * 1.50) * exp(-p.x * p.x * 3.69);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.56, 1.12) + fl * 0.30 + (time * 0.80) * 0.27)) * (0.0031 / (ld + 0.0060));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(1.026, 0.980, 1.012) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

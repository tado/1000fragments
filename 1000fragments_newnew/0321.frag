uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2((time * 0.73) * 0.52) * p;
	vec3 col = vec3(0.004, 0.022, 0.039);
	for(int li = 0; li < 8; li++){
		float fl = float(li);
		float fy = (fl / 8.0 - 0.5) * 1.93;
		float w = 0.09 * sin(p.x * 4.85 + (time * 0.73) * 1.33 + fl * 1.05);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.10, 2.20) + fl * 0.69 + (time * 0.73) * 0.46)) * (0.0066 / (ld + 0.0109));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.60);
	col = clamp(col, 0.0, 1.0) * vec3(1.050, 0.989, 0.919) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

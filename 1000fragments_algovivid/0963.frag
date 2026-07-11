uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	p = p.yx;
	p = rot2((time * 0.54) * -1.47) * p;
	vec3 col = vec3(0.034, 0.025, 0.030);
	for(int li = 0; li < 22; li++){
		float fl = float(li);
		float fy = (fl / 22.0 - 0.5) * 2.07;
		float w = 0.06 * sin(p.x * 7.57 + (time * 0.54) * 2.49 + fl * 1.15);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.82, 1.63) + fl * 0.35 + (time * 0.54) * 0.37)) * (0.0061 / (ld + 0.0131));
	}
	col = col / (1.0 + col);
	col *= 0.87 + 0.16 * sin(gl_FragCoord.y * 2.05 + (time * 0.54) * 9.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.38);
	col = clamp(col, 0.0, 1.0) * vec3(1.022, 0.971, 0.924) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.64;
	p = rot2((time * 0.73) * 0.38) * p;
	vec3 col = vec3(0.022, 0.009, 0.026);
	for(int li = 0; li < 9; li++){
		float fl = float(li);
		float fy = (fl / 9.0 - 0.5) * 1.43;
		float w = 0.27 * sin(p.x * 5.99 + (time * 0.73) * 4.69 + fl * 0.51) * exp(-p.x * p.x * 3.87);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.49, 2.98) + fl * 0.92 + (time * 0.73) * 0.22)) * (0.0026 / (ld + 0.0093));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col = clamp(col, 0.0, 1.0) * vec3(1.030, 0.949, 1.006) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

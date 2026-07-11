uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2((time * 0.67) * 1.10) * p;
	vec3 col = vec3(0.002, 0.021, 0.008);
	for(int li = 0; li < 14; li++){
		float fl = float(li);
		float fy = (fl / 14.0 - 0.5) * 1.83;
		float w = 0.14 * sin(p.x * 4.12 + (time * 0.67) * 1.44 + fl * 1.47) * exp(-p.x * p.x * 1.99);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.84, 1.69) + fl * 1.06 + (time * 0.67) * 0.95)) * (0.0040 / (ld + 0.0104));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(1.015, 0.993, 1.014) * 1.00 + 0.020;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

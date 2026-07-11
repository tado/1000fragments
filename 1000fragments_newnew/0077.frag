uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2((time * 0.65) * -0.33) * p;
	vec3 col = vec3(0.022, 0.001, 0.017);
	for(int li = 0; li < 11; li++){
		float fl = float(li);
		float fy = (fl / 11.0 - 0.5) * 1.51;
		float w = 0.16 * sin(p.x * 7.25 + (time * 0.65) * 1.09 + fl * 1.37);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.55, 1.10) + fl * 1.14 + (time * 0.65) * 0.80)) * (0.0044 / (ld + 0.0116));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.44 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(0.981, 0.992, 0.935) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.70) * p;
	vec3 col = vec3(0.037, 0.003, 0.007);
	for(int li = 0; li < 14; li++){
		float fl = float(li);
		float fy = (fl / 14.0 - 0.5) * 1.54;
		float w = 0.16 * sin(p.x * 6.00 + time * 2.02 + fl * 0.37);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.74 + time * 0.34)) * (0.0049 / (ld + 0.0125));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

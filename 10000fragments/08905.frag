uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.25) * p;
	vec3 col = vec3(0.033, 0.002, 0.015);
	for(int li = 0; li < 10; li++){
		float fl = float(li);
		float fy = (fl / 10.0 - 0.5) * 1.75;
		float w = 0.26 * sin(p.x * 8.73 + time * 2.58 + fl * 0.70) * exp(-p.x * p.x * 3.92);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.98 + time * 0.90)) * (0.0074 / (ld + 0.0083));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.60);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

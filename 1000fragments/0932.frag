uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.27) * p;
	vec3 col = vec3(0.015, 0.023, 0.006);
	for(int li = 0; li < 11; li++){
		float fl = float(li);
		float fy = (fl / 11.0 - 0.5) * 1.77;
		float w = 0.10 * sin(p.x * 5.14 + time * 5.00 + fl * 0.95) * exp(-p.x * p.x * 3.68);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 1.13 + time * 0.83)) * (0.0047 / (ld + 0.0105));
	}
	col = col / (1.0 + col);
	col *= 0.87 + 0.15 * sin(gl_FragCoord.y * 1.99 + time * 6.01);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

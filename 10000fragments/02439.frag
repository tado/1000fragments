uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.30) * p;
	vec3 col = vec3(0.028, 0.022, 0.050);
	for(int li = 0; li < 20; li++){
		float fl = float(li);
		float fy = (fl / 20.0 - 0.5) * 1.75;
		float w = 0.21 * sin(p.x * 9.17 + time * 4.99 + fl * 1.20) * exp(-p.x * p.x * 1.40);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.61 + time * 0.20)) * (0.0027 / (ld + 0.0102));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

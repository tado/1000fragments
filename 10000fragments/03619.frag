uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 1.06) * p;
	vec3 col = vec3(0.038, 0.024, 0.041);
	for(int li = 0; li < 9; li++){
		float fl = float(li);
		float fy = (fl / 9.0 - 0.5) * 1.81;
		float w = 0.13 * sin(p.x * 5.93 + time * 2.37 + fl * 1.50);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.71 + time * 0.58)) * (0.0040 / (ld + 0.0064));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

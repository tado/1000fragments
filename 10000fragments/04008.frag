uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.71) * p;
	vec3 col = vec3(0.018, 0.019, 0.005);
	for(int li = 0; li < 9; li++){
		float fl = float(li);
		float fy = (fl / 9.0 - 0.5) * 1.55;
		float w = 0.23 * sin(p.x * 8.81 + time * 2.28 + fl * 0.97) * exp(-p.x * p.x * 1.23);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.65 + time * 1.04)) * (0.0030 / (ld + 0.0106));
	}
	col = col / (1.0 + col);
	col = fract(col * 2.45);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.54) * p;
	vec3 col = vec3(0.007, 0.015, 0.043);
	for(int li = 0; li < 9; li++){
		float fl = float(li);
		float fy = (fl / 9.0 - 0.5) * 1.94;
		float w = 0.08 * sin(p.x * 7.96 + time * 1.70 + fl * 1.39);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.90 + time * 0.39)) * (0.0070 / (ld + 0.0046));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.80 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

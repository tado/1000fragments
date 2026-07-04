uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.09) * p;
	vec3 col = vec3(0.012, 0.014, 0.018);
	for(int li = 0; li < 16; li++){
		float fl = float(li);
		float fy = (fl / 16.0 - 0.5) * 2.06;
		float w = 0.13 * sin(p.x * 9.44 + time * 1.56 + fl * 0.96) * exp(-p.x * p.x * 3.90);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 1.07 + time * 0.78)) * (0.0080 / (ld + 0.0115));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.50 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

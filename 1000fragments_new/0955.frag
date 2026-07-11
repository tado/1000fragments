uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.51) * p;
	vec3 col = vec3(0.024, 0.025, 0.054);
	for(int li = 0; li < 22; li++){
		float fl = float(li);
		float fy = (fl / 22.0 - 0.5) * 1.75;
		float w = 0.13 * sin(p.x * 4.66 + time * 3.69 + fl * 0.69);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.89 + time * 0.49)) * (0.0058 / (ld + 0.0086));
	}
	col = col / (1.0 + col);
	col = fract(col * 1.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

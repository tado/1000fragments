uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.71) * p;
	vec3 col = vec3(0.021, 0.035, 0.054);
	for(int li = 0; li < 16; li++){
		float fl = float(li);
		float fy = (fl / 16.0 - 0.5) * 1.81;
		float w = 0.25 * sin(p.x * 9.96 + time * 1.79 + fl * 1.23) * exp(-p.x * p.x * 2.85);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.45 + time * 0.20)) * (0.0049 / (ld + 0.0092));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

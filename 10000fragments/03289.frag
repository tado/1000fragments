uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * 0.31) * p;
	vec3 col = vec3(0.036, 0.036, 0.051);
	for(int li = 0; li < 21; li++){
		float fl = float(li);
		float fy = (fl / 21.0 - 0.5) * 1.49;
		float w = 0.17 * sin(p.x * 3.16 + time * 4.51 + fl * 0.37);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.37 + time * 0.92)) * (0.0035 / (ld + 0.0077));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

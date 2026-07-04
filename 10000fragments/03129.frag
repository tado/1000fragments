uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.014, 0.004, 0.030);
	for(int li = 0; li < 20; li++){
		float fl = float(li);
		float fy = (fl / 20.0 - 0.5) * 1.92;
		float w = 0.06 * sin(p.x * 6.66 + time * 2.68 + fl * 0.94);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.32 + time * 1.19)) * (0.0039 / (ld + 0.0147));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.017, 0.035, 0.028);
	for(int li = 0; li < 22; li++){
		float fl = float(li);
		float fy = (fl / 22.0 - 0.5) * 2.19;
		float w = 0.14 * sin(p.x * 4.57 + time * 2.91 + fl * 1.59) * exp(-p.x * p.x * 1.07);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.92 + time * 0.31)) * (0.0060 / (ld + 0.0114));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

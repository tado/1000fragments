uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.003, 0.014, 0.045);
	for(int li = 0; li < 21; li++){
		float fl = float(li);
		float fy = (fl / 21.0 - 0.5) * 1.71;
		float w = 0.07 * sin(p.x * 3.80 + time * 1.90 + fl * 1.39);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.50 + time * 0.46)) * (0.0050 / (ld + 0.0123));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.034, 0.033, 0.023);
	for(int li = 0; li < 11; li++){
		float fl = float(li);
		float fy = (fl / 11.0 - 0.5) * 2.16;
		float w = 0.14 * sin(p.x * 6.96 + time * 2.61 + fl * 1.25) * exp(-p.x * p.x * 3.82);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.70 + time * 0.88)) * (0.0069 / (ld + 0.0077));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

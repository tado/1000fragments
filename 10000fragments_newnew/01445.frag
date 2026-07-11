uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.039, 0.038, 0.033);
	for(int li = 0; li < 22; li++){
		float fl = float(li);
		float fy = (fl / 22.0 - 0.5) * 1.42;
		float w = 0.26 * sin(p.x * 9.72 + time * 1.92 + fl * 1.09) * exp(-p.x * p.x * 3.59);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 1.04 + time * 0.88)) * (0.0032 / (ld + 0.0081));
	}
	col = col / (1.0 + col);
	col *= 0.88 + 0.15 * sin(gl_FragCoord.y * 1.05 + time * 7.64);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

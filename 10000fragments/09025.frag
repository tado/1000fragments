uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.013, 0.005, 0.009);
	for(int li = 0; li < 14; li++){
		float fl = float(li);
		float fy = (fl / 14.0 - 0.5) * 1.84;
		float w = 0.28 * sin(p.x * 5.46 + time * 3.91 + fl * 1.21) * exp(-p.x * p.x * 3.79);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.61 + time * 0.82)) * (0.0074 / (ld + 0.0123));
	}
	col = col / (1.0 + col);
	col *= 0.81 + 0.15 * sin(gl_FragCoord.y * 1.89 + time * 16.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.002, 0.002, 0.001);
	for(int li = 0; li < 11; li++){
		float fl = float(li);
		float fy = (fl / 11.0 - 0.5) * 1.76;
		float w = 0.20 * sin(p.x * 8.49 + time * 2.67 + fl * 1.40) * exp(-p.x * p.x * 2.63);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.31 + time * 0.77)) * (0.0026 / (ld + 0.0108));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

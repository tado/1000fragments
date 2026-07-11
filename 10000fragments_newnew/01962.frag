uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.008, 0.017, 0.007);
	for(int li = 0; li < 12; li++){
		float fl = float(li);
		float fy = (fl / 12.0 - 0.5) * 2.14;
		float w = 0.06 * sin(p.x * 2.16 + time * 3.05 + fl * 0.69);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.50 + time * 0.38)) * (0.0031 / (ld + 0.0076));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.82, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

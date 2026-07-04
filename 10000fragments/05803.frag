uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.019, 0.025, 0.040);
	for(int li = 0; li < 12; li++){
		float fl = float(li);
		float fy = (fl / 12.0 - 0.5) * 1.70;
		float w = 0.18 * sin(p.x * 5.67 + time * 2.03 + fl * 1.14) * exp(-p.x * p.x * 3.68);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.46 + time * 0.30)) * (0.0039 / (ld + 0.0137));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

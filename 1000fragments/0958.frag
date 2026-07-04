uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.001, 0.001, 0.056);
	for(int li = 0; li < 16; li++){
		float fl = float(li);
		float fy = (fl / 16.0 - 0.5) * 1.48;
		float w = 0.10 * sin(p.x * 4.17 + time * 2.79 + fl * 1.18);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.86 + time * 0.65)) * (0.0072 / (ld + 0.0119));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.23 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

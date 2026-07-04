uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.004, 0.030, 0.056);
	for(int li = 0; li < 21; li++){
		float fl = float(li);
		float fy = (fl / 21.0 - 0.5) * 1.62;
		float w = 0.14 * sin(p.x * 6.70 + time * 2.01 + fl * 0.49) * exp(-p.x * p.x * 3.60);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.84 + time * 0.91)) * (0.0079 / (ld + 0.0113));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.10 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

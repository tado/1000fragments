uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.006, 0.016, 0.054);
	for(int li = 0; li < 15; li++){
		float fl = float(li);
		float fy = (fl / 15.0 - 0.5) * 1.94;
		float w = 0.16 * sin(p.x * 5.25 + time * 1.05 + fl * 0.56);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 1.14 + time * 1.11)) * (0.0020 / (ld + 0.0100));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.42 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

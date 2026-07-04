uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.011, 0.032, 0.047);
	for(int li = 0; li < 19; li++){
		float fl = float(li);
		float fy = (fl / 19.0 - 0.5) * 1.63;
		float w = 0.05 * sin(p.x * 4.54 + time * 2.66 + fl * 1.12);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 1.08 + time * 0.79)) * (0.0078 / (ld + 0.0065));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.009, 0.014, 0.047);
	for(int li = 0; li < 19; li++){
		float fl = float(li);
		float fy = (fl / 19.0 - 0.5) * 1.81;
		float w = 0.15 * sin(p.x * 6.36 + time * 3.40 + fl * 1.16);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.92 + time * 0.38)) * (0.0047 / (ld + 0.0120));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

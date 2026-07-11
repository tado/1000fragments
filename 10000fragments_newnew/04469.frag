uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.020, 0.019, 0.028);
	for(int li = 0; li < 20; li++){
		float fl = float(li);
		float fy = (fl / 20.0 - 0.5) * 1.67;
		float w = 0.13 * sin(p.x * 6.26 + time * 3.16 + fl * 0.51);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.64 + time * 0.64)) * (0.0044 / (ld + 0.0126));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

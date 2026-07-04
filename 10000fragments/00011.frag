uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.022, 0.031, 0.033);
	for(int li = 0; li < 22; li++){
		float fl = float(li);
		float fy = (fl / 22.0 - 0.5) * 1.68;
		float w = 0.26 * sin(p.x * 8.87 + time * 3.73 + fl * 1.56) * exp(-p.x * p.x * 1.97);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.77 + time * 0.43)) * (0.0025 / (ld + 0.0080));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

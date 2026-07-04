uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.022, 0.026, 0.047);
	for(int li = 0; li < 11; li++){
		float fl = float(li);
		float fy = (fl / 11.0 - 0.5) * 1.88;
		float w = 0.19 * sin(p.x * 9.26 + time * 1.02 + fl * 0.97) * exp(-p.x * p.x * 2.34);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.53 + time * 0.43)) * (0.0077 / (ld + 0.0080));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.51 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

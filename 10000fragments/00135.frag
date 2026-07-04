uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.009, 0.033, 0.005);
	for(int li = 0; li < 17; li++){
		float fl = float(li);
		float fy = (fl / 17.0 - 0.5) * 1.80;
		float w = 0.14 * sin(p.x * 3.47 + time * 2.80 + fl * 0.60);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.84 + time * 0.36)) * (0.0049 / (ld + 0.0074));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

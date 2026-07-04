uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.019, 0.030, 0.040);
	for(int li = 0; li < 15; li++){
		float fl = float(li);
		float fy = (fl / 15.0 - 0.5) * 1.82;
		float w = 0.12 * sin(p.x * 2.51 + time * 3.88 + fl * 0.41);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.63 + time * 0.40)) * (0.0063 / (ld + 0.0111));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

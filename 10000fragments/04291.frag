uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.005, 0.021, 0.048);
	for(int li = 0; li < 21; li++){
		float fl = float(li);
		float fy = (fl / 21.0 - 0.5) * 1.58;
		float w = 0.10 * sin(p.x * 3.78 + time * 4.64 + fl * 1.22);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.32 + time * 0.42)) * (0.0041 / (ld + 0.0053));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

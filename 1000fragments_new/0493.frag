uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.016, 0.006, 0.029);
	for(int li = 0; li < 12; li++){
		float fl = float(li);
		float fy = (fl / 12.0 - 0.5) * 1.74;
		float w = 0.08 * sin(p.x * 3.51 + time * 1.63 + fl * 1.20);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.53 + time * 0.28)) * (0.0041 / (ld + 0.0085));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

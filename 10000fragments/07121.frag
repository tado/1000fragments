uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.007, 0.035, 0.042);
	for(int li = 0; li < 20; li++){
		float fl = float(li);
		float fy = (fl / 20.0 - 0.5) * 1.46;
		float w = 0.13 * sin(p.x * 4.13 + time * 1.02 + fl * 1.40);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.94 + time * 0.96)) * (0.0038 / (ld + 0.0075));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

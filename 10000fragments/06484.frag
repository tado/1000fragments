uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.008, 0.011, 0.059);
	for(int li = 0; li < 10; li++){
		float fl = float(li);
		float fy = (fl / 10.0 - 0.5) * 1.99;
		float w = 0.15 * sin(p.x * 3.80 + time * 3.17 + fl * 0.62);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.27 + time * 1.12)) * (0.0069 / (ld + 0.0109));
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.034, 0.036, 0.009);
	for(int li = 0; li < 18; li++){
		float fl = float(li);
		float fy = (fl / 18.0 - 0.5) * 1.49;
		float w = 0.24 * sin(p.x * 4.40 + time * 4.12 + fl * 1.14) * exp(-p.x * p.x * 1.45);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.82 + time * 1.14)) * (0.0049 / (ld + 0.0101));
	}
	col = col / (1.0 + col);
	col = mod(col * 2.20, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

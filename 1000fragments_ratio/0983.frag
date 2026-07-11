uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	if(resolution.x > resolution.y * 1.9) p = p.yx;
	p = p.yx;
	p.y += sin(p.x * 2.93 + (time * 0.58) * 0.67) * 0.14;
	vec3 col = vec3(0.016, 0.036, 0.051);
	for(int li = 0; li < 21; li++){
		float fl = float(li);
		float fy = (fl / 21.0 - 0.5) * 2.05;
		float w = 0.18 * sin(p.x * 6.52 + (time * 0.58) * 3.15 + fl * 1.38);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.06, 2.11) + fl * 1.13 + (time * 0.58) * 0.64)) * (0.0065 / (ld + 0.0144));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.37);
	col = clamp(col, 0.0, 1.0) * vec3(0.956, 1.000, 0.935) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

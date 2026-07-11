uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.59) * 0.45), cos((time * 0.59) * 0.51)) * 0.21;
	p.x = abs(p.x);
	vec3 col = vec3(0.031, 0.016, 0.012);
	for(int li = 0; li < 14; li++){
		float fl = float(li);
		float fy = (fl / 14.0 - 0.5) * 1.45;
		float w = 0.08 * sin(p.x * 7.23 + (time * 0.59) * 4.99 + fl * 0.35);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.38, 2.75) + fl * 0.48 + (time * 0.59) * 0.82)) * (0.0074 / (ld + 0.0135));
	}
	col = col / (1.0 + col);
	col *= 0.90 + 0.13 * sin(gl_FragCoord.y * 1.21 + (time * 0.59) * 17.63);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col = clamp(col, 0.0, 1.0) * vec3(0.942, 0.982, 1.058) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

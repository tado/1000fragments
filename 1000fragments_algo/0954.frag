uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.58;
	vec3 col = vec3(0.015, 0.018, 0.055);
	for(int li = 0; li < 10; li++){
		float fl = float(li);
		float fy = (fl / 10.0 - 0.5) * 1.59;
		float w = 0.17 * sin(p.x * 8.03 + (time * 0.58) * 1.66 + fl * 1.40);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.91, 1.83) + fl * 0.63 + (time * 0.58) * 0.69)) * (0.0044 / (ld + 0.0067));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(1.012, 0.997, 1.016) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.029, 0.039, 0.036);
	for(int li = 0; li < 10; li++){
		float fl = float(li);
		float fy = (fl / 10.0 - 0.5) * 1.56;
		float w = 0.12 * sin(p.x * 8.00 + (time * 0.67) * 1.31 + fl * 1.18) * exp(-p.x * p.x * 3.00);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.78, 1.57) + fl * 0.43 + (time * 0.67) * 1.11)) * (0.0027 / (ld + 0.0041));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.65 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(1.010, 0.984, 0.997) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

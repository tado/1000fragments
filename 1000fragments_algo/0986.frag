uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.50) * 0.99), cos((time * 0.50) * 0.93)) * 0.14;
	vec3 col = vec3(0.004, 0.006, 0.051);
	for(int li = 0; li < 14; li++){
		float fl = float(li);
		float fy = (fl / 14.0 - 0.5) * 1.77;
		float w = 0.12 * sin(p.x * 8.26 + (time * 0.50) * 3.34 + fl * 0.33);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.55, 1.09) + fl * 0.68 + (time * 0.50) * 1.06)) * (0.0066 / (ld + 0.0074));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(0.974, 0.998, 0.951) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

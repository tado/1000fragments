uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x) - 0.57;
	vec3 col = vec3(0.019, 0.024, 0.009);
	for(int li = 0; li < 18; li++){
		float fl = float(li);
		float fy = (fl / 18.0 - 0.5) * 1.97;
		float w = 0.16 * sin(p.x * 5.51 + (time * 0.67) * 2.34 + fl * 1.47);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.93, 1.86) + fl * 0.57 + (time * 0.67) * 0.40)) * (0.0040 / (ld + 0.0150));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.44 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.937, 0.990, 1.028) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

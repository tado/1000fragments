uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	vec3 col = vec3(0.012, 0.003, 0.053);
	for(int li = 0; li < 10; li++){
		float fl = float(li);
		float fy = (fl / 10.0 - 0.5) * 2.13;
		float w = 0.14 * sin(p.x * 6.81 + (time * 0.77) * 4.09 + fl * 0.65);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.92, 1.84) + fl * 0.32 + (time * 0.77) * 0.88)) * (0.0034 / (ld + 0.0141));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.44);
	col = clamp(col, 0.0, 1.0) * vec3(1.028, 0.978, 1.012) * 1.00 + 0.050;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

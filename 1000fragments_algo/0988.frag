uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	vec3 col = vec3(0.001, 0.027, 0.046);
	for(int li = 0; li < 22; li++){
		float fl = float(li);
		float fy = (fl / 22.0 - 0.5) * 1.43;
		float w = 0.21 * sin(p.x * 9.06 + (time * 0.74) * 2.40 + fl * 1.18) * exp(-p.x * p.x * 3.82);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.65, 1.30) + fl * 0.99 + (time * 0.74) * 0.23)) * (0.0066 / (ld + 0.0084));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(0.912, 0.994, 1.045) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

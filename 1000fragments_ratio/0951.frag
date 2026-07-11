uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.56) * 0.43), cos((time * 0.56) * 0.44)) * 0.08;
	p.x = abs(p.x);
	vec3 col = vec3(0.001, 0.022, 0.011);
	for(int li = 0; li < 13; li++){
		float fl = float(li);
		float fy = (fl / 13.0 - 0.5) * 2.00;
		float w = 0.15 * sin(p.x * 6.22 + (time * 0.56) * 4.74 + fl * 0.60);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.68, 3.36) + fl * 1.10 + (time * 0.56) * 0.78)) * (0.0046 / (ld + 0.0097));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col = clamp(col, 0.0, 1.0) * vec3(0.951, 1.016, 0.948) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

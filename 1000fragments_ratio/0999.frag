uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2((time * 0.56) * -1.41) * p;
	vec3 col = vec3(0.026, 0.031, 0.044);
	for(int li = 0; li < 8; li++){
		float fl = float(li);
		float fy = (fl / 8.0 - 0.5) * 1.99;
		float w = 0.27 * sin(p.x * 5.22 + (time * 0.56) * 4.41 + fl * 1.49) * exp(-p.x * p.x * 2.96);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.74, 3.49) + fl * 0.41 + (time * 0.56) * 0.89)) * (0.0020 / (ld + 0.0132));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col = clamp(col, 0.0, 1.0) * vec3(0.932, 0.976, 1.046) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

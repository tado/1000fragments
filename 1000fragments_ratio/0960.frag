uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p = p.yx;
	p = rot2((time * 0.83) * -0.37) * p;
	vec3 col = vec3(0.031, 0.004, 0.020);
	for(int li = 0; li < 12; li++){
		float fl = float(li);
		float fy = (fl / 12.0 - 0.5) * 1.54;
		float w = 0.22 * sin(p.x * 3.54 + (time * 0.83) * 1.16 + fl * 0.46) * exp(-p.x * p.x * 3.17);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.55, 3.10) + fl * 0.50 + (time * 0.83) * 0.56)) * (0.0038 / (ld + 0.0069));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col = clamp(col, 0.0, 1.0) * vec3(1.026, 0.980, 0.919) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

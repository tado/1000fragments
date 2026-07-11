uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.60;
	p *= 1.39;
	p = rot2((time * 0.77) * 1.34) * p;
	vec3 col = vec3(0.015, 0.039, 0.029);
	for(int li = 0; li < 22; li++){
		float fl = float(li);
		float fy = (fl / 22.0 - 0.5) * 2.08;
		float w = 0.17 * sin(p.x * 8.80 + (time * 0.77) * 2.76 + fl * 0.85) * exp(-p.x * p.x * 2.31);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.86, 1.73) + fl * 0.97 + (time * 0.77) * 0.52)) * (0.0060 / (ld + 0.0040));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.36));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col = clamp(col, 0.0, 1.0) * vec3(1.018, 0.984, 0.990) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

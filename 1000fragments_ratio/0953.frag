uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	if(resolution.x > resolution.y * 1.9) p = p.yx;
	p = rot2((time * 0.51) * 0.43) * p;
	vec3 col = vec3(0.010, 0.012, 0.005);
	for(int li = 0; li < 12; li++){
		float fl = float(li);
		float fy = (fl / 12.0 - 0.5) * 1.65;
		float w = 0.12 * sin(p.x * 4.64 + (time * 0.51) * 1.35 + fl * 1.19) * exp(-p.x * p.x * 1.01);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.52, 3.04) + fl * 0.63 + (time * 0.51) * 0.34)) * (0.0042 / (ld + 0.0091));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.82 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col = clamp(col, 0.0, 1.0) * vec3(0.948, 0.962, 1.059) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

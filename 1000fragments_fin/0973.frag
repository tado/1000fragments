uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.00;
	p = rot2((time * 0.71) * -1.19) * p;
	vec3 col = mix(vec3(0.031, 0.024, 0.045), vec3(0.030, 0.027, 0.058), clamp(0.5 + p.y * 0.26 + p.x * -0.24, 0.0, 1.0));
	for(int li = 0; li < 16; li++){
		float fl = float(li);
		float fy = (fl / 16.0 - 0.5) * 1.49;
		float w = 0.24 * sin(p.x * 7.45 + (time * 0.71) * 4.62 + fl * 1.59) * exp(-p.x * p.x * 1.40);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(5.646, 6.591, 7.536) + fl * 0.32 + (time * 0.71) * 0.31)) * (0.0036 / (ld + 0.0108));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.51);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(0.979, 1.015, 0.956);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.48 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

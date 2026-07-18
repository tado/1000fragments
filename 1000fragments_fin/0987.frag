uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.10 + (time * 0.70) * 0.94) * 0.20;
	p = rot2((time * 0.70) * 0.67) * p;
	vec3 col = mix(vec3(0.033, 0.034, 0.081), vec3(0.021, 0.036, 0.090), clamp(0.5 + p.y * -0.61 + p.x * -0.30, 0.0, 1.0));
	for(int li = 0; li < 12; li++){
		float fl = float(li);
		float fy = (fl / 12.0 - 0.5) * 1.49;
		float w = 0.28 * sin(p.x * 5.76 + (time * 0.70) * 2.39 + fl * 1.04) * exp(-p.x * p.x * 2.88);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(3.216, 5.114, 7.012) + fl * 0.97 + (time * 0.70) * 0.82)) * (0.0031 / (ld + 0.0087));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.04);
	col *= vec3(0.994, 1.013, 1.011);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

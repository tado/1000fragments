uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2((time * 0.85) * -0.54) * p;
	vec3 col = mix(vec3(0.059, 0.042, 0.051), vec3(0.077, 0.062, 0.031), clamp(0.5 + p.y * -0.29 + p.x * -0.05, 0.0, 1.0));
	for(int li = 0; li < 10; li++){
		float fl = float(li);
		float fy = (fl / 10.0 - 0.5) * 1.43;
		float w = 0.16 * sin(p.x * 3.52 + (time * 0.85) * 1.94 + fl * 0.67) * exp(-p.x * p.x * 3.15);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(1.458, 2.873, 4.288) + fl * 0.60 + (time * 0.85) * 1.08)) * (0.0049 / (ld + 0.0085));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col *= vec3(1.025, 0.982, 0.936);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

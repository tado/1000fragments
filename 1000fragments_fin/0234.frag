uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 9; ci++){
		q = abs(q) - 0.32;
		q = rot2(2.01 + sin((time * 0.85) * 0.57) * 0.05) * q;
		q *= 1.14;
		d1 = min(d1, abs(q.x));
		d2 = min(d2, length(q - vec2(0.22, -0.17)));
	}
	vec3 col = mix(vec3(0.035, 0.051, 0.087), vec3(0.052, 0.043, 0.119), clamp(0.5 + p.y * -0.09 + p.x * -0.19, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(5.140, 6.140, 7.139) + 2.92 + (time * 0.85) * 0.41)) * (0.0134 / (d1 + 0.015));
	col += (0.5 + 0.5 * cos(vec3(5.140, 6.140, 7.139) + 2.91 + (time * 0.85) * 0.43)) * (0.0176 / (d2 + 0.050));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.023, 0.966, 1.016);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

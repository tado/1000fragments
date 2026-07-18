uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x += p.y * -0.74;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 8; ci++){
		q = abs(q) - 0.26;
		q = rot2(0.31 + (time * 0.87) * 0.07) * q;
		q *= 1.21;
		d1 = min(d1, abs(q.x));
		d2 = min(d2, length(q - vec2(-0.27, 0.03)));
	}
	vec3 col = mix(vec3(0.039, 0.070, 0.040), vec3(0.034, 0.088, 0.058), clamp(0.5 + p.y * -0.38 + p.x * -0.12, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(1.578, 2.559, 3.539) + 3.56 + (time * 0.87) * 0.44)) * (0.0098 / (d1 + 0.017));
	col += (0.5 + 0.5 * cos(vec3(1.578, 2.559, 3.539) + 4.13 + (time * 0.87) * 0.33)) * (0.0121 / (d2 + 0.028));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.006, 0.971, 0.964);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

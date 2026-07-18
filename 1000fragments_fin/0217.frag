uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p += vec2(sin((time * 0.56) * 0.63), cos((time * 0.56) * 0.79)) * 0.19;
	p.y += sin(p.x * 2.47 + (time * 0.56) * 1.40) * 0.10;
	p *= 1.12;
	vec2 q = p;
	float d1 = 1000.0; float d2 = 1000.0;
	for(int ci = 0; ci < 5; ci++){
		q = abs(q) - 0.29;
		q = rot2(0.31 + (time * 0.56) * 0.03) * q;
		q *= 1.11;
		d1 = min(d1, abs(length(q) - 0.50));
	}
	vec3 col = mix(vec3(0.026, 0.035, 0.052), vec3(0.016, 0.028, 0.034), clamp(0.5 + p.y * 0.30 + p.x * -0.18, 0.0, 1.0));
	col += (0.5 + 0.5 * cos(vec3(4.465, 5.971, 7.478) + 2.00 + (time * 0.56) * 0.33)) * (0.0102 / (d1 + 0.019));
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(1.018, 0.950, 1.023);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

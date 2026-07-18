uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.60) * 0.62), cos((time * 0.60) * 0.90)) * 0.14;
	p.y = abs(p.y) - 0.58;
	p *= 2.79;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 7.69;
		float pv = sin(gq.x + (time * 0.60) * 0.75) * sin(gq.y - (time * 0.60) * 1.24);
		col += fw * (0.5 + 0.5 * cos(vec3(4.756, 5.887, 7.018) + pv * 3.48 + float(zi) * 0.59 + (time * 0.60) * 0.37));
		q = rot2(0.53) * q * 0.78 + vec2(0.28, -0.07);
		fw *= 0.70;
	}
	col *= 0.43;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.67));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.013, 0.971, 1.024);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

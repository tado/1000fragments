uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.00;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 4.44;
		float pv = sin(gq.x + (time * 0.80) * 1.86) * sin(gq.y - (time * 0.80) * 2.82);
		col += fw * (0.5 + 0.5 * cos(vec3(3.976, 4.895, 5.813) + pv * 3.68 + float(zi) * 1.10 + (time * 0.80) * 0.02));
		q = rot2(0.49) * q * 0.69 + vec2(-0.02, -0.26);
		fw *= 0.60;
	}
	col *= 0.33;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.38));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(0.937, 0.989, 1.056);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

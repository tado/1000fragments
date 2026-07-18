uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * 0.65;
	p *= 1.43;
	p.x *= resolution.x / resolution.y;
	p *= 1.62;
	vec2 q = p * 1.96;
	float am = 0.48;
	for(int wi = 0; wi < 5; wi++){
		q += am * vec2(sin(q.y * 1.55 + (time * 0.91) * 0.79), sin(q.x * 1.52 - (time * 0.91) * 0.47));
		q = rot2(0.88) * q;
		am *= 0.83;
	}
	float v = sin(q.x * 2.49 + q.y * 0.92);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.038, 0.098, 0.115), vec3(0.139, 0.616, 0.463), smoothstep(0.0, 0.50, cc)), vec3(0.973, 0.983, 0.887), smoothstep(0.50, 1.0, cc));
	col = mix(col, vec3(0.08, 0.05, 0.08), smoothstep(0.77, 1.0, abs(v)) * 0.76);
	col *= 0.82 + 0.17 * sin(gl_FragCoord.y * 0.91 + (time * 0.91) * 16.30);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.08);
	col *= vec3(0.986, 0.991, 0.991);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x) - 0.53;
	p.x *= resolution.x / resolution.y;
	p *= 2.32;
	vec2 q = p * 1.86;
	float am = 0.43;
	for(int wi = 0; wi < 5; wi++){
		q += am * vec2(sin(q.y * 2.38 + (time * 0.81) * 0.56), sin(q.x * 2.97 - (time * 0.81) * 0.59));
		q = rot2(0.72) * q;
		am *= 0.84;
	}
	float v = sin(q.x * 1.85 + q.y * 2.04);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.150, 0.051, 0.107), vec3(0.992, 0.763, 0.705), cc);
	col = mix(col, vec3(0.04, 0.07, 0.05), smoothstep(0.78, 1.0, abs(v)) * 0.59);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.98));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(0.990, 0.999, 0.986);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.53 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.69;
	vec2 q = p * 1.27;
	float am = 0.47;
	for(int wi = 0; wi < 5; wi++){
		q += am * vec2(sin(q.y * 1.41 + (time * 0.64) * 0.51), sin(q.x * 2.51 - (time * 0.64) * 0.51));
		q = rot2(1.08) * q;
		am *= 0.83;
	}
	float v = sin(q.x * 2.55 + q.y * 2.11);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.056, 0.040, 0.065), vec3(0.816, 0.974, 0.916), cc);
	col = mix(col, vec3(0.03, 0.04, 0.10), smoothstep(0.78, 1.0, abs(v)) * 0.84);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.66));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col *= vec3(0.990, 1.011, 0.993);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

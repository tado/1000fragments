uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * -0.72;
	p += vec2(sin((time * 0.70) * 0.69), cos((time * 0.70) * 0.46)) * 0.22;
	p.x *= resolution.x / resolution.y;
	p *= 1.38;
	vec2 q = p * 2.12;
	float am = 0.36;
	for(int wi = 0; wi < 5; wi++){
		q += am * vec2(sin(q.y * 3.07 + (time * 0.70) * 0.28), sin(q.x * 3.02 - (time * 0.70) * 0.76));
		am *= 0.67;
	}
	float v = sin(q.x * 1.68 + q.y * 1.73);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.50, 0.49, 0.38) + vec3(0.07, 0.06, 0.10);
	col = mix(col, vec3(0.11, 0.11, 0.13), smoothstep(0.89, 1.0, abs(v)) * 0.76);
	col *= 0.84 + 0.18 * sin(gl_FragCoord.y * 2.54 + (time * 0.70) * 11.10);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(0.983, 0.995, 0.940);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.27 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

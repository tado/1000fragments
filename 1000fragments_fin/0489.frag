uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q = p * 1.39;
	float am = 0.45;
	for(int wi = 0; wi < 6; wi++){
		q += am * vec2(sin(q.y * 1.33 + (time * 0.62) * 0.37), sin(q.x * 2.16 - (time * 0.62) * 0.67));
		am *= 0.66;
	}
	float v = sin(q.x * 3.14 + q.y * 0.91);
	vec3 col = vec3(0.740, 0.758, 0.995) * (0.11 / (abs((v)) + 0.05));
	col = col / (1.0 + col);
	col *= 0.85 + 0.18 * sin(gl_FragCoord.y * 2.83 + (time * 0.62) * 11.63);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.038, 1.003, 0.934);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q = p * 2.68;
	float am = 0.28;
	for(int wi = 0; wi < 4; wi++){
		q += am * vec2(sin(q.y * 3.15 + (time * 0.61) * 0.31), sin(q.x * 2.45 - (time * 0.61) * 0.57));
		am *= 0.81;
	}
	float v = sin(q.x * 3.94 + q.y * 2.40);
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.66, 0.68, 0.60) + vec3(0.08, 0.08, 0.11);
	col = mix(col, vec3(0.14, 0.12, 0.14), smoothstep(0.86, 1.0, abs(v)) * 0.77);
	col *= 0.90 + 0.17 * sin(gl_FragCoord.y * 0.92 + (time * 0.61) * 16.24);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.021, 0.998, 0.935);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.27 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

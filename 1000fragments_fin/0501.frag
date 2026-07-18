uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q = p * 1.49;
	float am = 0.46;
	for(int wi = 0; wi < 4; wi++){
		q += am * vec2(sin(q.y * 2.11 + (time * 0.92) * 0.68), sin(q.x * 2.07 - (time * 0.92) * 0.57));
		am *= 0.70;
	}
	float v = sin(q.x * 3.45 + q.y * 2.07);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.099, 0.030, 0.116), vec3(0.740, 0.354, 0.470), smoothstep(0.0, 0.51, cc)), vec3(1.000, 0.948, 0.838), smoothstep(0.51, 1.0, cc));
	col = mix(col, vec3(0.05, 0.10, 0.10), smoothstep(0.82, 1.0, abs(v)) * 0.70);
	col *= 0.90 + 0.15 * sin(gl_FragCoord.y * 2.23 + (time * 0.92) * 6.59);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(1.033, 0.980, 0.951);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

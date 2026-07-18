uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 2.74 + (time * 0.80) * 1.38) * 0.09;
	p.x = abs(p.x);
	vec2 q = p * 1.27;
	float am = 0.28;
	for(int wi = 0; wi < 3; wi++){
		q += am * vec2(sin(q.y * 1.46 + (time * 0.80) * 0.37), sin(q.x * 1.37 - (time * 0.80) * 0.42));
		am *= 0.64;
	}
	float v = sin(q.x * 1.61 + q.y * 0.68);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.142, 0.034, 0.137), vec3(0.769, 0.306, 0.456), smoothstep(0.0, 0.41, cc)), vec3(0.969, 0.915, 0.817), smoothstep(0.41, 1.0, cc));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.16));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(0.939, 0.981, 1.032);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.58 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

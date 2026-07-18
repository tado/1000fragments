uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.89) * 0.61), cos((time * 0.89) * 1.19)) * 0.06;
	p.y = abs(p.y);
	vec2 q = p * 1.74;
	float am = 0.27;
	for(int wi = 0; wi < 3; wi++){
		q += am * vec2(sin(q.y * 3.10 + (time * 0.89) * 0.64), sin(q.x * 2.27 - (time * 0.89) * 0.36));
		am *= 0.80;
	}
	float v = sin(q.x * 3.93 + q.y * 1.00);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.037, 0.114, 0.082), vec3(0.860, 0.940, 0.652), smoothstep(0.0, 1.0, cc));
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.044, 1.005, 0.926);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

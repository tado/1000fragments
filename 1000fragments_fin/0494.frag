uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y);
	p.x *= resolution.x / resolution.y;
	p *= 1.14;
	vec2 q = p * 2.01;
	float am = 0.39;
	for(int wi = 0; wi < 5; wi++){
		q += am * vec2(sin(q.y * 2.03 + (time * 0.58) * 0.57), sin(q.x * 1.78 - (time * 0.58) * 0.62));
		am *= 0.76;
	}
	float v = sin(q.x * 2.86 + q.y * 0.97);
	vec3 col = vec3(0.783, 0.996, 0.891) * (0.05 / (abs((v)) + 0.06));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.75));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(1.055, 1.005, 0.924);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.63;
	vec2 q = p * 2.10;
	float am = 0.49;
	for(int wi = 0; wi < 6; wi++){
		q += am * vec2(sin(q.y * 3.11 + (time * 0.57) * 0.30), sin(q.x * 2.66 - (time * 0.57) * 0.74));
		am *= 0.71;
	}
	float v = sin(q.x * 3.66 + q.y * 1.93);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.951, 0.871, 0.813), vec3(0.211, 0.229, 0.472), cc);
	col = mix(col, vec3(0.12, 0.07, 0.09), smoothstep(0.84, 1.0, abs(v)) * 0.69);
	col = clamp((col - 0.5) * 2.14 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(1.010, 0.988, 1.008);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

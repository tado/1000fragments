uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.30;
	vec2 q = p * 2.67;
	float am = 0.34;
	for(int wi = 0; wi < 3; wi++){
		q += am * vec2(sin(q.y * 2.87 + (time * 0.65) * 0.66), sin(q.x * 3.03 - (time * 0.65) * 0.65));
		am *= 0.85;
	}
	float v = sin(q.x * 3.70 + q.y * 2.26);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.702, 0.973, 0.815), vec3(0.147, 0.054, 0.139), cc);
	col = mix(col, vec3(0.08, 0.06, 0.11), smoothstep(0.75, 1.0, abs(v)) * 0.67);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(0.986, 0.986, 0.986);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

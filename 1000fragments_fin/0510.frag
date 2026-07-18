uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x);
	p *= 1.02;
	vec2 q = p * 1.50;
	float am = 0.38;
	for(int wi = 0; wi < 3; wi++){
		q += am * vec2(sin(q.y * 2.62 + (time * 0.71) * 0.26), sin(q.x * 1.50 - (time * 0.71) * 0.75));
		am *= 0.80;
	}
	float v = sin(q.x * 2.97 + q.y * 1.59);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.030, 0.076, 0.099), vec3(0.174, 0.591, 0.487), smoothstep(0.0, 0.54, cc)), vec3(0.955, 0.974, 0.885), smoothstep(0.54, 1.0, cc));
	col = mix(col, vec3(0.10, 0.12, 0.11), smoothstep(0.84, 1.0, abs(v)) * 0.85);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.44);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(1.025, 0.992, 0.963);
	col += 0.023;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.56 + (time * 0.83) * 1.02) * 0.12;
	p *= 2.12;
	vec2 q = p * 2.15;
	float am = 0.26;
	for(int wi = 0; wi < 5; wi++){
		q += am * vec2(sin(q.y * 1.92 + (time * 0.83) * 0.53), sin(q.x * 1.52 - (time * 0.83) * 0.56));
		am *= 0.78;
	}
	float v = sin(q.x * 1.51 + q.y * 0.75);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.021, 0.067, 0.098), vec3(0.153, 0.581, 0.504), smoothstep(0.0, 0.56, cc)), vec3(0.947, 0.935, 0.902), smoothstep(0.56, 1.0, cc));
	col = mix(col, vec3(0.06, 0.04, 0.02), smoothstep(0.84, 1.0, abs(v)) * 0.69);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(0.989, 0.996, 1.004);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.42 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.41;
	vec2 q = p * 1.34;
	float am = 0.46;
	for(int wi = 0; wi < 6; wi++){
		q += am * vec2(sin(q.y * 1.79 + (time * 0.74) * 0.22), sin(q.x * 2.89 - (time * 0.74) * 0.80));
		am *= 0.74;
	}
	float v = sin(q.x * 3.99 + q.y * 1.15);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.138, 0.065, 0.162), vec3(0.740, 0.347, 0.447), smoothstep(0.0, 0.54, cc)), vec3(1.000, 0.947, 0.818), smoothstep(0.54, 1.0, cc));
	col = mix(col, vec3(0.09, 0.11, 0.14), smoothstep(0.80, 1.0, abs(v)) * 0.57);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.39);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col *= vec3(1.034, 0.984, 0.940);
	col += 0.007;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

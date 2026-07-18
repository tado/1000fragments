uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.67) * 0.61), cos((time * 0.67) * 1.01)) * 0.12;
	p.x = abs(p.x) - 0.23;
	p *= 1.34;
	vec2 q = p * 2.77;
	float am = 0.38;
	for(int wi = 0; wi < 3; wi++){
		q += am * vec2(sin(q.y * 2.77 + (time * 0.67) * 0.64), sin(q.x * 1.23 - (time * 0.67) * 0.70));
		q = rot2(0.34) * q;
		am *= 0.62;
	}
	float v = sin(q.x * 3.40 + q.y * 1.97);
	vec3 col = vec3(0.800, 0.946, 0.914) * (0.10 / (abs((v)) + 0.09));
	col = col / (1.0 + col);
	col = mix(col, vec3(0.08, 0.04, 0.03), smoothstep(0.84, 1.0, abs(v)) * 0.67);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.030, 0.947, 1.001);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

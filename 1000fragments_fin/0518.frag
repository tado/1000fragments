uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.93;
	vec2 q = p * 1.31;
	float am = 0.32;
	for(int wi = 0; wi < 4; wi++){
		q += am * vec2(sin(q.y * 2.03 + (time * 0.56) * 0.63), sin(q.x * 2.57 - (time * 0.56) * 0.26));
		q = rot2(0.49) * q;
		am *= 0.68;
	}
	float v = sin(q.x * 3.87 + q.y * 1.19);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.044, 0.042, 0.052), vec3(0.517, 0.869, 0.931), smoothstep(0.0, 1.0, cc));
	col = mix(col, vec3(0.06, 0.08, 0.09), smoothstep(0.76, 1.0, abs(v)) * 0.63);
	col = clamp((col - 0.5) * 1.83 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(1.002, 0.960, 1.012);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

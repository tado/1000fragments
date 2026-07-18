uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p.x *= resolution.x / resolution.y;
	vec2 q = p * 2.19;
	float am = 0.42;
	for(int wi = 0; wi < 5; wi++){
		q += am * vec2(sin(q.y * 2.60 + (time * 0.84) * 0.22), sin(q.x * 2.83 - (time * 0.84) * 0.76));
		q = rot2(0.51) * q;
		am *= 0.81;
	}
	float v = sin(q.x * 2.33 + q.y * 1.40);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(vec3(0.064, 0.084, 0.053), vec3(0.858, 0.944, 0.637), smoothstep(0.0, 1.0, cc));
	col = mix(col, vec3(0.10, 0.07, 0.05), smoothstep(0.83, 1.0, abs(v)) * 0.52);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.022, 0.998, 0.959);
	col += 0.020;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

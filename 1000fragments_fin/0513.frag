uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.27;
	p.x *= resolution.x / resolution.y;
	vec2 q = p * 1.77;
	float am = 0.45;
	for(int wi = 0; wi < 6; wi++){
		q += am * vec2(sin(q.y * 1.45 + (time * 0.84) * 0.26), sin(q.x * 2.52 - (time * 0.84) * 0.30));
		q = rot2(1.03) * q;
		am *= 0.85;
	}
	float v = sin(q.x * 3.04 + q.y * 2.22);
	vec3 col = vec3(0.196, 0.277, 0.483) * (0.08 / (abs((v)) + 0.05));
	col = col / (1.0 + col);
	col *= 0.81 + 0.14 * sin(gl_FragCoord.y * 1.92 + (time * 0.84) * 10.50);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col *= vec3(1.029, 0.974, 1.019);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.40 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

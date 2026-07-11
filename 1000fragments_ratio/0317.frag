uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(length(q) * 16.45 - (time * 0.76) * 1.84);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.96, 1.92) + pv * 2.36 + float(zi) * 1.32 + (time * 0.76) * 0.09));
		q = rot2(0.83) * q * 0.82 + vec2(-0.05, 0.27);
		fw *= 0.72;
	}
	col *= 0.31;
	col *= 0.88 + 0.16 * sin(gl_FragCoord.y * 1.59 + (time * 0.76) * 10.17);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col = clamp(col, 0.0, 1.0) * vec3(1.003, 0.986, 0.995) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

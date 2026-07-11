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
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 8.0 + length(q) * 11.19 - (time * 0.81) * 4.34);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.46, 0.92) + pv * 2.66 + float(zi) * 1.36 + (time * 0.81) * 0.72));
		q = rot2(0.77) * q * 0.62 + vec2(-0.01, 0.17);
		fw *= 0.62;
	}
	col *= 0.37;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(1.013, 0.945, 1.029) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

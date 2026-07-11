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
		float pv = sin(atan(q.y, q.x) * 8.0 + length(q) * 9.07 - (time * 0.70) * 1.47);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.69, 1.38) + pv * 2.09 + float(zi) * 0.55 + (time * 0.70) * 0.24));
		q = rot2(1.14) * q * 0.74 + vec2(-0.16, -0.19);
		fw *= 0.61;
	}
	col *= 0.43;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.63);
	col = clamp(col, 0.0, 1.0) * vec3(1.024, 0.960, 1.028) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

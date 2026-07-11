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
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 11.49 - (time * 0.60) * 4.97);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.99, 1.97) + pv * 1.90 + float(zi) * 1.49 + (time * 0.60) * 0.71));
		q = rot2(0.62) * q * 1.36 + vec2(-0.26, -0.19);
		fw *= 0.69;
	}
	col *= 0.42;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(1.026, 0.941, 1.015) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

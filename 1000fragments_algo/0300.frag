uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.73) * 1.16), cos((time * 0.73) * 0.97)) * 0.05;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 8.0 + length(q) * 9.08 - (time * 0.73) * 1.81);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.56, 1.11) + pv * 3.99 + float(zi) * 1.12 + (time * 0.73) * 0.02));
		q = rot2(0.49) * q * 0.67 + vec2(0.27, -0.27);
		fw *= 0.72;
	}
	col *= 0.30;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.35);
	col = clamp(col, 0.0, 1.0) * vec3(0.997, 1.003, 1.009) * 1.00 + 0.023;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

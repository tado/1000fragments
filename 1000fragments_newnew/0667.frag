uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.05;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 7.0 + length(q) * 10.28 - (time * 0.80) * 3.80);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.56, 1.12) + pv * 3.70 + float(zi) * 0.77 + (time * 0.80) * 0.38));
		q = rot2(1.05) * q * 1.28 + vec2(0.16, 0.01);
		fw *= 0.61;
	}
	col *= 0.37;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(0.988, 1.008, 0.986) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

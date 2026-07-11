uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y += sin(p.x * 2.08 + (time * 0.65) * 0.72) * 0.10;
	p *= 0.88;
	p.x *= resolution.x / resolution.y;
	p *= 1.09;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 8.0 + length(q) * 4.39 - (time * 0.65) * 2.33);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.12, 2.24) + pv * 3.78 + float(zi) * 0.56 + (time * 0.65) * 0.35));
		q = rot2(0.73) * q * 1.58 + vec2(0.26, 0.20);
		fw *= 0.69;
	}
	col *= 0.34;
	col = clamp((col - 0.5) * 1.84 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col = clamp(col, 0.0, 1.0) * vec3(1.007, 0.978, 1.000) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p = p.yx;
	p.y += sin(p.x * 1.13 + (time * 0.52) * 1.21) * 0.16;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 7.93;
		float pv = sin(gq.x + (time * 0.52) * 0.84) * sin(gq.y - (time * 0.52) * 0.65);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.38, 2.75) + pv * 3.95 + float(zi) * 0.70 + (time * 0.52) * 0.45));
		q = rot2(0.31) * q * 0.71 + vec2(0.06, 0.11);
		fw *= 0.67;
	}
	col *= 0.40;
	col *= 0.90 + 0.15 * sin(gl_FragCoord.y * 1.54 + (time * 0.52) * 12.80);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.39);
	col = clamp(col, 0.0, 1.0) * vec3(0.934, 0.985, 1.054) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

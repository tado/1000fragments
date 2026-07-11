uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.96 + (time * 0.58) * 0.75) * 0.17;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 8.42 - (time * 0.58) * 3.15);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.55, 3.10) + pv * 2.23 + float(zi) * 0.67 + (time * 0.58) * 0.29));
		q = rot2(0.99) * q * 1.38 + vec2(-0.26, 0.09);
		fw *= 0.70;
	}
	col *= 0.45;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col = clamp(col, 0.0, 1.0) * vec3(0.956, 1.017, 0.947) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

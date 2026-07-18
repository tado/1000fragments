uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.75;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 4.0 + length(q) * 6.22 - (time * 0.84) * 1.16);
		col += fw * (0.5 + 0.5 * cos(vec3(5.316, 6.864, 8.412) + pv * 2.03 + float(zi) * 0.75 + (time * 0.84) * 0.62));
		q = rot2(0.32) * q * 1.53 + vec2(0.04, -0.06);
		fw *= 0.65;
	}
	col *= 0.38;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(1.030, 0.993, 0.961);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

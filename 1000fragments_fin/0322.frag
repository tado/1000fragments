uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y = abs(p.y);
	p += vec2(sin((time * 0.82) * 0.81), cos((time * 0.82) * 1.06)) * 0.23;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 6.19 - (time * 0.82) * 4.90);
		col += fw * (0.5 + 0.5 * cos(vec3(0.929, 1.723, 2.516) + pv * 2.93 + float(zi) * 1.20 + (time * 0.82) * 0.62));
		q = rot2(0.32) * q * 0.68 + vec2(-0.17, 0.05);
		fw *= 0.70;
	}
	col *= 0.37;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(0.969, 1.000, 0.943);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.37 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

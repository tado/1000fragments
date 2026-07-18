uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x);
	p.x *= resolution.x / resolution.y;
	p *= 1.35;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 17.65 - (time * 0.81) * 4.67);
		col += fw * (0.5 + 0.5 * cos(vec3(5.687, 7.140, 8.594) + pv * 2.50 + float(zi) * 0.90 + (time * 0.81) * 0.76));
		q = rot2(0.92) * q * 1.23 + vec2(0.19, -0.16);
		fw *= 0.64;
	}
	col *= 0.41;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.27));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.28);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(1.054, 1.008, 0.922);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

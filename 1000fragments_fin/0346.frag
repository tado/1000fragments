uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x);
	p.x *= resolution.x / resolution.y;
	p *= 1.07;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 8.0 + length(q) * 8.95 - (time * 0.88) * 4.58);
		col += fw * (0.5 + 0.5 * cos(vec3(0.004, 1.263, 2.523) + pv * 3.27 + float(zi) * 1.41 + (time * 0.88) * 0.09));
		q = rot2(1.03) * q * 0.77 + vec2(-0.25, -0.23);
		fw *= 0.63;
	}
	col *= 0.33;
	col = clamp((col - 0.5) * 1.50 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.52);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.031, 1.011, 0.937);
	col += 0.011;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.45 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

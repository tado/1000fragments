uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x += p.y * -0.25;
	p.x *= resolution.x / resolution.y;
	p *= 1.00;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		float pv = sin(length(q) * 16.41 - (time * 0.63) * 2.56);
		col += fw * (0.5 + 0.5 * cos(vec3(3.981, 6.039, 8.096) + pv * 3.32 + float(zi) * 1.06 + (time * 0.63) * 0.16));
		q = rot2(0.67) * q * 1.25 + vec2(0.14, 0.16);
		fw *= 0.70;
	}
	col *= 0.43;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(0.938, 0.994, 1.058);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.53 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

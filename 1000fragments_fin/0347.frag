uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x) - 0.57;
	p.x *= resolution.x / resolution.y;
	p *= 0.99;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(length(q) * 16.74 - (time * 0.68) * 4.06);
		col += fw * (0.5 + 0.5 * cos(vec3(0.350, 1.252, 2.154) + pv * 2.14 + float(zi) * 0.47 + (time * 0.68) * 0.06));
		q = rot2(1.13) * q * 1.62 + vec2(0.09, -0.17);
		fw *= 0.73;
	}
	col *= 0.32;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(0.990, 0.988, 1.009);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

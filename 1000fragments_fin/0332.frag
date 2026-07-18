uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.57;
	p.y += sin(p.x * 1.02 + (time * 0.58) * 0.69) * 0.13;
	p.x *= resolution.x / resolution.y;
	p *= 2.39;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 6.47;
		float pv = sin(gq.x + (time * 0.58) * 2.20) * sin(gq.y - (time * 0.58) * 1.80);
		col += fw * (0.5 + 0.5 * cos(vec3(5.453, 6.884, 8.316) + pv * 3.86 + float(zi) * 0.33 + (time * 0.58) * 0.12));
		q = rot2(1.14) * q * 0.65 + vec2(0.19, -0.24);
		fw *= 0.62;
	}
	col *= 0.36;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(0.963, 0.999, 0.938);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

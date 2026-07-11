uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 1.83 + (time * 0.83) * 0.87) * 0.12;
	p.x += p.y * 0.72;
	p *= 1.32;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 8.31;
		float pv = sin(gq.x + (time * 0.83) * 2.60) * sin(gq.y - (time * 0.83) * 1.58);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.85, 1.70) + pv * 2.85 + float(zi) * 0.58 + (time * 0.83) * 0.58));
		q = rot2(0.89) * q * 1.35 + vec2(0.09, -0.05);
		fw *= 0.71;
	}
	col *= 0.44;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.33);
	col = clamp(col, 0.0, 1.0) * vec3(0.950, 1.000, 0.923) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

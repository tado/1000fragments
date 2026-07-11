uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.94;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(length(q) * 13.48 - (time * 0.61) * 2.00);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.73, 1.46) + pv * 2.52 + float(zi) * 1.17 + (time * 0.61) * 0.04));
		q = rot2(0.70) * q * 0.74 + vec2(0.29, 0.02);
		fw *= 0.56;
	}
	col *= 0.35;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(1.059, 1.002, 0.938) * 1.00 + 0.019;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

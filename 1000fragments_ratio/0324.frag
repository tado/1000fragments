uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.67) * 1.09), cos((time * 0.67) * 0.31)) * 0.10;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 10.22 - (time * 0.67) * 1.19);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.49, 2.98) + pv * 2.28 + float(zi) * 0.46 + (time * 0.67) * 0.59));
		q = rot2(0.70) * q * 1.67 + vec2(-0.22, -0.26);
		fw *= 0.68;
	}
	col *= 0.35;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(0.920, 0.990, 1.023) * 1.00 + 0.027;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

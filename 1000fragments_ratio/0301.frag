uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.59) * 0.50), cos((time * 0.59) * 0.73)) * 0.24;
	p *= 2.52;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		float pv = sin(atan(q.y, q.x) * 6.0 + length(q) * 5.02 - (time * 0.59) * 3.91);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.22, 2.43) + pv * 3.65 + float(zi) * 0.38 + (time * 0.59) * 0.22));
		q = rot2(0.59) * q * 1.40 + vec2(0.04, 0.06);
		fw *= 0.74;
	}
	col *= 0.40;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.38);
	col = clamp(col, 0.0, 1.0) * vec3(1.025, 0.954, 1.012) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

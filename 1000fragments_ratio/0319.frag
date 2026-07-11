uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p *= 2.20;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 7.86 - (time * 0.56) * 2.65);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.22, 2.43) + pv * 2.58 + float(zi) * 1.11 + (time * 0.56) * 0.44));
		q = rot2(0.76) * q * 1.40 + vec2(-0.14, -0.29);
		fw *= 0.56;
	}
	col *= 0.31;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col = clamp(col, 0.0, 1.0) * vec3(0.949, 0.975, 1.043) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

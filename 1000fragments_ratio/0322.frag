uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = p.yx;
	p.x += p.y * 0.66;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 6.03;
		float pv = sin(gq.x + (time * 0.55) * 2.46) * sin(gq.y - (time * 0.55) * 1.27);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.44, 2.88) + pv * 3.17 + float(zi) * 0.66 + (time * 0.55) * 0.36));
		q = rot2(0.76) * q * 1.25 + vec2(0.08, -0.16);
		fw *= 0.62;
	}
	col *= 0.36;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col = clamp(col, 0.0, 1.0) * vec3(0.926, 0.979, 1.033) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

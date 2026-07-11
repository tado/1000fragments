uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * -0.77;
	p *= 2.52;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 6.84 - (time * 0.82) * 4.49);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.91, 1.82) + pv * 2.11 + float(zi) * 0.85 + (time * 0.82) * 0.39));
		q = rot2(0.83) * q * 0.70 + vec2(0.11, 0.19);
		fw *= 0.59;
	}
	col *= 0.33;
	col *= 0.83 + 0.13 * sin(gl_FragCoord.y * 2.15 + (time * 0.82) * 9.86);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.38);
	col = clamp(col, 0.0, 1.0) * vec3(1.033, 0.983, 0.948) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

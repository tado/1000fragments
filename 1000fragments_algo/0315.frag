uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.05;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 9.0 + length(q) * 13.89 - (time * 0.85) * 4.65);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 1.00, 2.00) + pv * 1.97 + float(zi) * 0.63 + (time * 0.85) * 0.19));
		q = rot2(0.36) * q * 0.68 + vec2(0.15, -0.18);
		fw *= 0.57;
	}
	col *= 0.45;
	col *= 0.87 + 0.11 * sin(gl_FragCoord.y * 1.48 + (time * 0.85) * 17.70);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(1.051, 0.994, 0.935) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.35;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 9.15 - (time * 0.82) * 1.83);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.43, 0.85) + pv * 3.79 + float(zi) * 0.93 + (time * 0.82) * 0.05));
		q = rot2(1.06) * q * 1.67 + vec2(0.05, 0.26);
		fw *= 0.67;
	}
	col *= 0.33;
	col *= 0.83 + 0.12 * sin(gl_FragCoord.y * 1.16 + (time * 0.82) * 4.63);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(0.966, 1.011, 0.932) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

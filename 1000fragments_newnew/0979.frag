uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.04;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 6.56 - (time * 0.65) * 3.84);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.69, 1.37) + pv * 2.64 + float(zi) * 0.93 + (time * 0.65) * 0.78));
		q = rot2(0.74) * q * 1.26 + vec2(0.16, 0.27);
		fw *= 0.67;
	}
	col *= 0.39;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.46);
	col = clamp(col, 0.0, 1.0) * vec3(0.914, 0.978, 1.027) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}

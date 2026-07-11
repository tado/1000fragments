uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.52;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 9.31;
		float pv = sin(gq.x + (time * 0.59) * 1.20) * sin(gq.y - (time * 0.59) * 1.25);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.60, 1.20) + pv * 2.46 + float(zi) * 1.18 + (time * 0.59) * 0.43));
		q = rot2(1.16) * q * 1.33 + vec2(0.26, -0.08);
		fw *= 0.72;
	}
	col *= 0.31;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.48);
	col = clamp(col, 0.0, 1.0) * vec3(0.978, 1.013, 0.953) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
